import React from "react";

function Navbar({ setPage }) {
  return (
    <div className="navbar">
      <h1>💳 Digital Banking Assistant</h1>
      <div className="nav-buttons">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("chatbot")}>ChatBot</button>
      </div>
    </div>
  );
}

export default Navbar;
