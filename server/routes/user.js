import express from "express";
import { authenticateUser } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to your dashboard!", user: req.user });
});

export default router;
