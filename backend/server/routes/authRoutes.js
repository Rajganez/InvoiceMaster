import { Router } from "express";
import { loginSignUp } from "../controller/authController.js";

// Router setup
const authRouters = Router();

authRouters.post("/login", loginSignUp);

export default authRouters;