import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import CustomerProfile from "./CustomerProfile";
import LoanApplication from "./LoanApplication";
import RepaymentTracker from "./RepaymentTracker";
import GoldVault from "./GoldVault";
import ReportsExport from "./ReportsExport";
import Footer from "./Footer";
import Login from "./Login";
import LoanRetrieve from "./LoanRetrieve";

function App() {
  const [page, setPage] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "customer_profile" && <CustomerProfile setPage={setPage} />}
        {page === "loan_application" && <LoanApplication setPage={setPage} />}
        {page === "repayment_tracker" && <RepaymentTracker setPage={setPage} />}
        {page === "gold_vault" && <GoldVault setPage={setPage} />}
        {page === "reports" && <ReportsExport setPage={setPage} />}
        {page === "loan_retrieve" && <LoanRetrieve setPage={setPage} />}
      </main>

      <Footer />

      {/* 🔐 Login Popup */}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;