import { useState } from "react";
import axios from "axios";

function AddTransaction({ onAdded }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    try {
      const res = await axios.post("http://localhost:5000/api/transactions", {
        desc,
        amount: parseFloat(amount)
      });
      onAdded(); 
      setDesc("");
      setAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Transaction description"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (+ income, - expense)"
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
