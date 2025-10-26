// backend/routes/chatRoutes.js
router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    if (message.toLowerCase().includes("recent")) {
      const transactions = await Transaction.find().sort({ date: -1 }).limit(5);

      if (!transactions.length) {
        return res.json({ reply: "No recent transactions found." });
      }

      const reply = transactions
        .map((txn) => {
          const type = txn.amount >= 0 ? "Credited" : "Debited";
          const date = new Date(txn.date).toLocaleString("en-IN");
          return `${date} → ${txn.description}: $${txn.amount} (${type})`;
        })
        .join("\n");

      return res.json({ reply });
    }
