import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Demo user
router.get("/demo-user", async (req, res) => {
  let user = await User.findOne({ email: "demo@bank.com" });
  if (!user) {
    user = new User({ email: "demo@bank.com", password: "demo", balance: 50000 });
    await user.save();
  }
  res.json({ user });
});

export default router;
