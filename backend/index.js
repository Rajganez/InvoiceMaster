import express from "express";
import cors from "cors";
import connectToDB from "./server/DB/mongo-db.js";
import cookieParser from "cookie-parser";
import authRouters from "./server/routes/authRoutes.js";

// Initialize Express app and connect to MongoDB database
const app = express();
await connectToDB;

app.use(cookieParser());
// Enable CORS for the API
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Create express json for body parsing
app.use(express.json());
// Import routes from the server/routes folder
app.use("/auth", authRouters);

// Establish server connection in the port for mongodb connections
app.listen(
  5000,
  console.log(`Started at ${new Date()}Server is Running in port : ${5000}`)
);
