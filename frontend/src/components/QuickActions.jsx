import React from "react";

function QuickActions({ onAddTransaction, balance }) {
  const handleAddMoney = () => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (isNaN(amount)) {
      alert("Invalid input. Please enter a number.");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be greater than 0!");
      return;
    }

    onAddTransaction({ description: "Added Money", amount });
  };

  const handlePayBill = () => {
    const billName = prompt("Enter bill name or description:");
    if (!billName) return;

    const amount = parseFloat(prompt(`Enter amount for ${billName}:`));
    if (isNaN(amount)) {
      alert("Invalid input. Please enter a number.");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be greater than 0!");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance!");
      return;
    }

    onAddTransaction({ description: `Paid Bill: ${billName}`, amount: -amount });
  };

  const handleSendMoney = () => {
    const recipient = prompt("Enter recipient name or account:");
    if (!recipient) return;

    const amount = parseFloat(prompt(`Enter amount to send to ${recipient}:`));
    if (isNaN(amount)) {
      alert("Invalid input. Please enter a number.");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be greater than 0!");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance!");
      return;
    }

    onAddTransaction({ description: `Sent Money to ${recipient}`, amount: -amount });
  };

  return (
    <div className="quick-actions">
      <button onClick={handleAddMoney}>Add Money</button>
      <button onClick={handlePayBill}>Pay Bill</button>
      <button onClick={handleSendMoney}>Send Money</button>
    </div>
  );
}

export default QuickActions;
