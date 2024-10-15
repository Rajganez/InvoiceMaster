import { Router } from "express";
import {
  getRetailerDetails,
  loginSignUp,
  logout,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Router setup
const authRouters = Router();

authRouters.post("/login", loginSignUp);
authRouters.get("/retailers", verifyToken, getRetailerDetails);
authRouters.get("/log-out", verifyToken, logout);

export default authRouters;
