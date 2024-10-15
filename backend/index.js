import express from "express";
import cors from "cors";
import connectToDB from "./server/DB/mongo-db.js";
import cookieParser from "cookie-parser";
import authRouters from "./server/routes/authRoutes.js";
import invoiceRouters from "./server/routes/invoiceRoute.js";
import paymentRouter from "./server/controller/paymentController.js";
import path from 'path';

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
    allowedHeaders: ["Content-Type", "Authorization"], // Add required headers
  })
);

// Parse JSON bodies
app.use(express.json());

// Serve static files with correct content-type headers
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Define routes
app.use("/auth", authRouters);
app.use("/bill", invoiceRouters);
app.use("/gateway", paymentRouter);

// Establish server connection
app.listen(
  5000,
  console.log(`Server started at ${new Date()}. Running on port: 5000`)
);
