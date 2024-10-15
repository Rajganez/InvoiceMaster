import { Router } from "express";
import {
  changeInvoiceStatus,
  createInvoice,
  getInvoiceDetails,
  getInvoiceDetailsForBilling,
} from "../controller/invoiceController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const invoiceRouters = Router();

invoiceRouters.post("/invoice", verifyToken, createInvoice);
invoiceRouters.post("/get-invoices", verifyToken, getInvoiceDetails);
invoiceRouters.post(
  "/billing-invoice/:id",
  verifyToken,
  getInvoiceDetailsForBilling
);
invoiceRouters.post("/update-invoice", verifyToken, changeInvoiceStatus);

export default invoiceRouters;
