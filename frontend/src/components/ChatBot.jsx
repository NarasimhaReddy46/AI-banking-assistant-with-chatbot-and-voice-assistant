import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function ChatBot({ transactions, balance }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };
    setMessages([...messages, userMsg]);

    let botMsg = "";
    let chart = null; // For sending charts

    const lowerInput = input.toLowerCase();

    // EXISTING PROMPTS
    if (lowerInput.includes("balance")) {
      botMsg = `Your balance is: $${balance}`;
    } else if (lowerInput.includes("recent")) {
      if (transactions.length === 0) {
        botMsg = "No recent transactions available.";
      } else {
        const recentTxns = transactions.slice(0, 5); // last 5 transactions
        botMsg = recentTxns
          .map((t) => {
            const type = t.amount >= 0 ? "Credited" : "Debited";
            const date = new Date(t.date).toLocaleString();
            const description = t.description || "No description";
            return `${description}\n${date}\n${type}: $${t.amount}`;
          })
          .join("\n\n");
      }
    }
    // NEW PROMPTS
    else if (lowerInput.includes("spending")) {
      const debits = transactions.filter((t) => t.amount < 0);
      const totalSpent = debits.reduce((acc, t) => acc + Math.abs(t.amount), 0);
      botMsg = `You have spent $${totalSpent} in total.`;

      // Optional bar chart for spending per transaction
      const labels = debits.map((t) => t.description || "No description");
      const data = debits.map((t) => Math.abs(t.amount));

      chart = (
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Spending",
                data,
                backgroundColor: "rgba(255,99,132,0.5)",
              },
            ],
          }}
          options={{ responsive: true }}
        />
      );
    } else if (lowerInput.includes("income")) {
      const credits = transactions.filter((t) => t.amount > 0);
      const totalIncome = credits.reduce((acc, t) => acc + t.amount, 0);
      botMsg = `You received $${totalIncome} in total.`;

      // Optional bar chart for income per transaction
      const labels = credits.map((t) => t.description || "No description");
      const data = credits.map((t) => t.amount);

      chart = (
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Income",
                data,
                backgroundColor: "rgba(54,162,235,0.5)",
              },
            ],
          }}
          options={{ responsive: true }}
        />
      );
    } else if (lowerInput.includes("largest")) {
      if (transactions.length === 0) {
        botMsg = "No transactions available.";
      } else {
        const largestCredit = transactions
          .filter((t) => t.amount > 0)
          .sort((a, b) => b.amount - a.amount)[0];
        const largestDebit = transactions
          .filter((t) => t.amount < 0)
          .sort((a, b) => a.amount - b.amount)[0];
        botMsg = `Largest Credit: ${largestCredit?.description || "No description"} - $${largestCredit?.amount || 0}\nLargest Debit: ${largestDebit?.description || "No description"} - $${largestDebit?.amount || 0}`;
      }
    } else if (lowerInput.includes("search")) {
      const keyword = lowerInput.split("search")[1]?.trim();
      if (!keyword) {
        botMsg = "Please specify a keyword to search for transactions.";
      } else {
        const filtered = transactions.filter((t) =>
          (t.description || "").toLowerCase().includes(keyword)
        );
        if (filtered.length === 0) botMsg = `No transactions found for '${keyword}'.`;
        else {
          botMsg = filtered
            .map((t) => {
              const type = t.amount >= 0 ? "Credited" : "Debited";
              const date = new Date(t.date).toLocaleString();
              const description = t.description || "No description";
              return `${description}\n${date}\n${type}: $${t.amount}`;
            })
            .join("\n\n");
        }
      }
    } else if (lowerInput.includes("summary")) {
      const totalCredits = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
      const totalDebits = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
      botMsg = `Summary:\nTotal Credits: $${totalCredits}\nTotal Debits: $${totalDebits}\nNet Change: $${totalCredits - totalDebits}`;

      // Pie chart
      chart = (
        <Pie
          data={{
            labels: ["Credits", "Debits"],
            datasets: [
              {
                label: "Summary",
                data: [totalCredits, totalDebits],
                backgroundColor: ["rgba(54,162,235,0.6)", "rgba(255,99,132,0.6)"],
              },
            ],
          }}
          options={{ responsive: true }}
        />
      );
    } else if (lowerInput.includes("help")) {
      botMsg =
        "I can help you with:\n- 'balance' : Show your current balance\n- 'recent' : Show last 5 transactions\n- 'spending' : Show total spending and chart\n- 'income' : Show total income and chart\n- 'largest' : Show largest debit/credit\n- 'search <keyword>' : Search transactions by description\n- 'summary' : Show credits vs debits summary with pie chart";
    } else {
      botMsg = "I didn't understand. Type 'help' to see what I can do.";
    }

    setMessages((prev) => [...prev, { text: botMsg, sender: "bot", chart }]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">
        <h2>ChatBot Assistant</h2>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {msg.chart && <div style={{ maxWidth: "500px", margin: "10px 0" }}>{msg.chart}</div>}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
