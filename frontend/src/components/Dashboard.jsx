import React from "react";
import QuickActions from "./QuickActions.jsx";
import TransactionList from "./TransactionList.jsx";

function Dashboard({ transactions, balance, onAddTransaction }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Dashboard</h2>
        <h3>Balance: ${balance}</h3>
        <QuickActions onAddTransaction={onAddTransaction} balance={balance} />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;
