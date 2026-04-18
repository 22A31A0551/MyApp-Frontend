import React, { useState } from "react";

function ReportsExport({ setPage }) {
  const [activeTab, setActiveTab] = useState("portfolio");

  const tabs = [
    { id: "customer_ledger", label: "Customer Ledger" },
    { id: "daily_collection", label: "Daily Collection" },
    { id: "portfolio", label: "Portfolio Summary" }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <BackButton setPage={setPage} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Reports & Analytics</h2>
        <button style={{ padding: "10px 20px", background: "var(--primary)", color: "white", borderRadius: "8px", border: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
          ⬇ Export Report
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: "10px 20px", 
              background: activeTab === tab.id ? "var(--surface-color)" : "transparent",
              color: activeTab === tab.id ? "var(--text-main)" : "var(--text-muted)",
              border: `1px solid ${activeTab === tab.id ? "var(--glass-border)" : "transparent"}`,
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: "40px", borderRadius: "16px", minHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {activeTab === "customer_ledger" && (
           <ReportPlaceholder title="Customer Ledger" desc="Full transaction history and loan details for individual customers." />
        )}
        {activeTab === "daily_collection" && (
           <ReportPlaceholder title="Daily Collection Report" desc="All payments received (Cash & Digital) on a specific date." />
        )}
        {activeTab === "portfolio" && (
           <ReportPlaceholder title="Portfolio Summary" desc="Total loans outstanding, gold inventory status, and interest earned KPIs." />
        )}
      </div>

    </div>
  );
}

const ReportPlaceholder = ({ title, desc }) => (
  <div style={{ textAlign: "center", maxWidth: "400px" }}>
    <h3 style={{ fontSize: "22px", color: "var(--text-main)", marginBottom: "15px" }}>{title} Preview</h3>
    <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "30px" }}>{desc}</p>
    <div style={{ padding: "20px", background: "var(--bg-subtle)", border: "1px dashed var(--glass-border)", borderRadius: "12px", color: "var(--text-muted)" }}>
       [ Mock Data Presentation Area ]<br/>
       Usually rendered as an HTML table here
    </div>
  </div>
);

const BackButton = ({ setPage }) => (
  <button onClick={() => setPage("dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Dashboard
  </button>
);

export default ReportsExport;
