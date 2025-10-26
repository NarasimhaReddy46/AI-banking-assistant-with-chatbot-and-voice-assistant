import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ChatBot from "./components/ChatBot.jsx";
import axios from "axios";

function App() {
  const [page, setPage] = useState("dashboard");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/transactions");
      const txns = Array.isArray(res.data) ? res.data : [];
      setTransactions(txns);

      const total = txns.reduce((acc, t) => acc + t.amount, 0);
      setBalance(total);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (txn) => {
    try {
      const res = await axios.post("http://localhost:5000/api/transactions", {
        description: txn.description,
        amount: txn.amount,
        date: new Date()
      });

      const savedTxn = res.data;
      const updatedTransactions = [savedTxn, ...transactions];
      setTransactions(updatedTransactions);

      const total = updatedTransactions.reduce((acc, t) => acc + t.amount, 0);
      setBalance(total);
    } catch (err) {
      console.error("Failed to save transaction:", err);
      alert("Transaction failed. Check server.");
    }
  };

  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "dashboard" && (
        loading ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</p>
        ) : (
          <Dashboard
            transactions={transactions}
            balance={balance}
            onAddTransaction={handleAddTransaction}
          />
        )
      )}

      {page === "chatbot" && (
        loading ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>Loading chatbot...</p>
        ) : (
          <ChatBot
            transactions={transactions}
            balance={balance}
          />
        )
      )}
    </div>
  );
}

export default App;
