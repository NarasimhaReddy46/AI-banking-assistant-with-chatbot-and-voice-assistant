import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 50000 },
  transactions: [transactionSchema]
});

export default mongoose.model("User", userSchema);
