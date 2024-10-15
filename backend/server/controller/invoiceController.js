import { ObjectId } from "mongodb";
import { db } from "../DB/mongo-db.js";
import { distributorCollection } from "./authController.js";

export const invoiceCollections = db.collection("Invoices");

const generateUniqueNumber = () => {
  const min = 100;
  const max = 999;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

//----------------Function to Create a new invoice---------//

export const createInvoice = async (req, res) => {
  const {
    retailerid,
    retailername,
    value,
    description,
    distributorId,
    distributorName,
  } = req.body;
  try {
    const invoice = {
      date: new Date().toLocaleDateString(),
      billNo: `INV${generateUniqueNumber()}`,
      Amount: value,
      Description: description,
      status: "Pending",
      retailerName: retailername,
      retailerID: retailerid,
      distributorID: distributorId,
      distributorname: distributorName,
    };
    const result = await invoiceCollections.insertOne(invoice);
    if (result.acknowledged === true) {
      return res.status(201).json({ msg: "Invoice created successfully" });
    } else {
      return res.status(400).json({ msg: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//-----------Get Invoice Details for the retailer---------//

export const getInvoiceDetails = async (req, res) => {
  const { retailerid } = req.body;
  try {
    const invoices = await invoiceCollections
      .find({ retailerID: retailerid })
      .toArray();
    if (invoices.length > 0) {
      return res.status(200).json({ invoices });
    } else {
      return res.status(404).json({ msg: "No invoices found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//-----------Get Invoice Details for Billing------------//

export const getInvoiceDetailsForBilling = async (req, res) => {
  const { id } = req.params;
  try {
    const Id = ObjectId.createFromHexString(id);
    const getInvoice = await invoiceCollections.findOne({ _id: Id });
    const issuerId = ObjectId.createFromHexString(getInvoice.distributorID);
    const issuerMail = await distributorCollection.findOne({ _id: issuerId });
    const invoiceData = {
      ...getInvoice,
      issuerEmail: issuerMail.email,
    };
    if (!getInvoice) return res.status(404).json({ msg: "Invoice not found" });
    return res.status(200).json([invoiceData]);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//------------Change invoice Billing status------------//

export const changeInvoiceStatus = async (req, res) => {
  const { id } = req.body;
  try {
    const Id = ObjectId.createFromHexString(id);
    const findInvoice = await invoiceCollections.findOne({ _id: Id });
    if (!findInvoice) return res.status(404).json({ msg: "Invoice not found" });
    const updateInvoice = await invoiceCollections.updateOne(
      { _id: Id },
      { $set: { status: "Paid" } }
    );
    if (updateInvoice.acknowledged === true) {
      return res.status(200).json({ msg: "Invoice updated successfully" });
    }
    return res.status(403).json({ msg: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
