import { useState } from "react";
import Navbar from "./Navbar";
import LoanEntry from "./LoanEntry";
import LoanRetrieve from "./LoanRetrieve";
import Login from "./Login";

function App() {
  const [page, setPage] = useState("home");

  // ✅ LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>

      {/* TOP NAVBAR */}
      <Navbar 
        setShowLogin={setShowLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* BELOW NAVBAR */}
      <div style={{ display: "flex", marginTop: "60px" }}>

        {/* SIDEBAR */}
        <div style={sidebar}>
          <h2>Dashboard</h2>

          {/* HOME */}
          <p style={menuItem} onClick={() => setPage("home")}>
            🏠 Home
          </p>

          {/* LOAN ENTRY */}
          <p
            style={menuItem}
            onClick={() => {
              if (!isLoggedIn) {
                setShowLogin(true); // 🔥 better UX than alert
                return;
              }
              setPage("entry");
            }}
          >
            ➕ Loan Entry
          </p>

          {/* LOAN RETRIEVE */}
          <p
            style={menuItem}
            onClick={() => {
              if (!isLoggedIn) {
                setShowLogin(true); // 🔥 open login popup
                return;
              }
              setPage("retrieve");
            }}
          >
            🔍 Loan Retrieve
          </p>
        </div>

        {/* CONTENT */}
        <div style={content}>
          {page === "home" && <h2>Welcome</h2>}

          {page === "entry" && isLoggedIn && <LoanEntry />}
          {page === "retrieve" && isLoggedIn && <LoanRetrieve />}
        </div>

      </div>

      {/* ✅ LOGIN POPUP */}
      {showLogin && (
        <Login 
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

    </div>
  );
}

/* Styles */

const sidebar = {
  width: "200px",
  height: "calc(100vh - 60px)",
  backgroundColor: "#1e293b",
  color: "white",
  padding: "20px",
};

const menuItem = {
  marginTop: "15px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "6px",
};

const content = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#f5f5f5",
};

export default App;