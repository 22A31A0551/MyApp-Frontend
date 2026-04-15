import { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import CustomerProfile from "./CustomerProfile";
import LoanApplication from "./LoanApplication";
import RepaymentTracker from "./RepaymentTracker";
import GoldVault from "./GoldVault";
import ReportsExport from "./ReportsExport";
import Footer from "./Footer";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "customer_profile" && <CustomerProfile setPage={setPage} />}
        {page === "loan_application" && <LoanApplication setPage={setPage} />}
        {page === "repayment_tracker" && <RepaymentTracker setPage={setPage} />}
        {page === "gold_vault" && <GoldVault setPage={setPage} />}
        {page === "reports" && <ReportsExport setPage={setPage} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;