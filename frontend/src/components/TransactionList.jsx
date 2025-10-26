import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((tx, index) => (
          <div key={index} className="transaction-card">
            <p>
              <strong>{tx.description || "No description"}</strong>
              <br />
              {new Date(tx.date).toLocaleString()} <br />
              {tx.amount >= 0 ? "Credited" : "Debited"}: ${tx.amount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;
