import Razorpay from "razorpay";
import { Router } from "express";
import dotenv from "dotenv";
import { invoiceCollections } from "./invoiceController.js";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "../../../node_modules/razorpay/dist/utils/razorpay-utils.js";
// ./dist/utils/razorpay-utils.js
import { ObjectId } from "mongodb";
import { verifyToken } from "../middleware/verifyToken.js";

dotenv.config();

const paymentRouter = Router();

paymentRouter.post("/payment-invoice", verifyToken, async (req, res) => {
  const { id } = req.body;
  try {
    const Id = ObjectId.createFromHexString(id);
    const invoiceData = await invoiceCollections.findOne({ _id: Id });
    const instance = new Razorpay({
      key_id: process.env.PAYMENT_KEY_ID,
      key_secret: process.env.PAYMENT_SECRET,
    });
    const options = {
      amount: invoiceData.Amount * 100,
      currency: "INR",
      receipt: invoiceData.billNo + id,
    };
    instance.orders.create(options, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(499).json({ msg: "Payment Failed" });
      }
      res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

paymentRouter.post("/verify-payment", verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    // const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const isValid = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.PAYMENT_SECRET
    );
    if (isValid) {
      return res.status(200).json({ msg: "Payment Successful" });
    } else {
      console.log(error);
      return res.status(400).json({ msg: "Payment Signature Mismatch" });
    }
    // const generated_signature = hmac_sha256(
    //   razorpay_order_id + "|" + razorpay_payment_id,
    //   process.env.PAYMENT_SECRET
    // );
    // if (generated_signature === razorpay_signature) {
    //   return res.status(200).json({ msg: "Payment Successful" });
    // } else {
    //   console.log(error);
    //   return res.status(400).json({ msg: "Payment Signature Mismatch" });
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default paymentRouter;
