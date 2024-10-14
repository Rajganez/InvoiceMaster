import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Load environment variables
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;

// Get the MongoDB connection strings from environment variables
const uri = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=InvoiceApp`;

// Create a new MongoClient instance and connect to the MongoDB database
const client = new MongoClient(uri);

// Get the database name from environment variable
const db = client.db(process.env.DB_NAME);

// Function to connect to MongoDB database
const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectToDB;
export { db };
