import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET all transactions (newest first)
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new transaction
router.post("/", async (req, res) => {
  try {
    const { description, amount } = req.body;

    if (!description || amount === undefined) {
      return res.status(400).json({ error: "Description and amount are required" });
    }

    const transaction = new Transaction({
      description,
      amount,
      date: new Date()
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
