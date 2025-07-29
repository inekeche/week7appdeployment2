// routes/authRoutes.js
import express from "express";
import { testAuth, register, login } from "../controllers/authController.js";

const router = express.Router();

// Test route
router.get("/", testAuth);

// Auth routes
router.post("/register", register);
router.post("/login", login);

export default router;
