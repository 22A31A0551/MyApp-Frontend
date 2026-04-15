import React from "react";
import { DUMMY_LOANS, DUMMY_VAULT, DUMMY_EMIS } from "./mockData";

function Dashboard({ setPage }) {
  const activeLoansCount = DUMMY_LOANS.filter(l => l.status === "Active").length;
  const overdueCount = DUMMY_EMIS.filter(e => e.status === "Overdue").length;
  const totalGoldWeight = DUMMY_VAULT.filter(v => v.status === "Pledged").reduce((acc, curr) => acc + curr.weight, 0);

  const modules = [
    { id: "customer_profile", title: "Customer Profile", color: "#10b981", icon: "👤", desc: "KYC, Documents, & Loan History" },
    { id: "loan_application", title: "Loan Application", color: "#6366f1", icon: "📝", desc: "New Loans & Auto-LTV Calculator" },
    { id: "repayment_tracker", title: "Repayment Tracker", color: "#f59e0b", icon: "💸", desc: "EMI Schedules & Collections" },
    { id: "gold_vault", title: "Gold Vault", color: "#eab308", icon: "💎", desc: "Inventory & Item Status" },
    { id: "reports", title: "Reports & Export", color: "#a855f7", icon: "📊", desc: "Ledgers, Collections, Portfolio" }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "40px" }}>
      {/* 4 Key Numbers Grid */}
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "25px" }}>Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        
        <div className="glass-card" style={{ padding: "25px", borderRadius: "20px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>Active Loans</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "white" }}>{activeLoansCount}</div>
        </div>
        
        <div className="glass-card" style={{ padding: "25px", borderRadius: "20px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>EMIs Due Today</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "#22d3ee" }}>0</div>
        </div>

        <div className="glass-card" style={{ padding: "25px", borderRadius: "20px", borderLeft: overdueCount > 0 ? "4px solid #ef4444" : "" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>Overdue Accounts</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: overdueCount > 0 ? "#ef4444" : "white" }}>{overdueCount}</div>
        </div>

        <div className="glass-card" style={{ padding: "25px", borderRadius: "20px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>Total Gold Held</div>
          <div style={{ fontSize: "36px", fontWeight: "700", color: "#eab308" }}>{totalGoldWeight} <span style={{fontSize: "20px"}}>g</span></div>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        {/* Module Nav Grid */}
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}>System Modules</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {modules.map((m) => (
              <div 
                key={m.id}
                className="glass-card"
                onClick={() => setPage(m.id)}
                style={{
                  padding: "25px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px"
                }}
              >
                <div style={{ fontSize: "32px", background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "14px" }}>
                  {m.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", marginBottom: "6px", color: "white" }}>{m.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: "1.4" }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Reminders Panel */}
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}>Alerts & Reminders</h2>
          <div className="glass" style={{ padding: "25px", borderRadius: "20px" }}>
            <div style={{ marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid var(--glass-border)" }}>
               <h4 style={{ color: "#ef4444", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                 <span style={{ fontSize: "18px" }}>⚠️</span> Action Required
               </h4>
               {DUMMY_EMIS.filter(e => e.status === "Overdue").map((emi, i) => (
                 <div key={i} style={{ fontSize: "14px", color: "var(--text-main)", marginBottom: "8px", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px" }}>
                   {emi.loanId} due on {emi.dueDate} <span style={{ color: "#ef4444", fontWeight: "bold" }}>({emi.daysLate} days late)</span>
                 </div>
               ))}
            </div>
            <div>
               <h4 style={{ color: "#22d3ee", marginBottom: "10px" }}>Daily Collection Summary</h4>
               <div style={{ display: "flex", justifyContent: "space-between", margin: "5px 0", fontSize: "14px", color: "var(--text-muted)"}}>
                 <span>Cash Received</span>
                 <span style={{ color: "white" }}>₹ 0</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", margin: "5px 0", fontSize: "14px", color: "var(--text-muted)"}}>
                 <span>Digital Payments</span>
                 <span style={{ color: "white" }}>₹ 0</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
