import express from "express";
import cors from "cors";
import connectToDB from "./server/DB/mongo-db.js";
import cookieParser from "cookie-parser";
import authRouters from "./server/routes/authRoutes.js";
import invoiceRouters from "./server/routes/invoiceRoute.js";
import paymentRouter from "./server/controller/paymentController.js";

// Initialize Express app and connect to MongoDB database
const app = express();
await connectToDB;

app.use(cookieParser());
// Enable CORS for the API
app.use(
  cors({
    origin: ["https://invoicemasterbyraj.netlify.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Create express json for body parsing
app.use(express.json());
// Import routes from the server/routes folder
app.use("/auth", authRouters);
app.use("/bill", invoiceRouters);
app.use("/gateway", paymentRouter);

// Establish server connection in the port for mongodb connections
app.listen(
  5000,
  console.log(`Started at ${new Date()}Server is Running in port : ${5000}`)
);
