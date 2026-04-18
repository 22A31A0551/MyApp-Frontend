import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { DUMMY_EMIS } from "./mockData";

function RepaymentTracker({ setPage }) {
  const [selectedEmi, setSelectedEmi] = useState(null);

  const handleRecordPayment = () => {
    alert(`Payment recorded for ${selectedEmi.loanId}`);
    setSelectedEmi(null);
  };

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <BackButton setPage={setPage} />
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "25px" }}>Repayment Tracker</h2>

      <div className="glass" style={{ padding: "30px", borderRadius: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ color: "var(--text-muted)", fontSize: "14px", borderBottom: "1px solid var(--glass-border)" }}>
              <th style={{ padding: "15px 10px" }}>Loan ID</th>
              <th style={{ padding: "15px 10px" }}>Due Date</th>
              <th style={{ padding: "15px 10px" }}>Amount</th>
              <th style={{ padding: "15px 10px" }}>Status</th>
              <th style={{ padding: "15px 10px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_EMIS.map((emi, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "15px 10px", fontWeight: "600", color: "var(--text-main)" }}>{emi.loanId}</td>
                <td style={{ padding: "15px 10px" }}>{emi.dueDate}</td>
                <td style={{ padding: "15px 10px" }}>₹{emi.amount.toLocaleString()}</td>
                <td style={{ padding: "15px 10px" }}>
                  <span style={{ 
                    background: emi.status === "Paid" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", 
                    color: emi.status === "Paid" ? "#10b981" : "#ef4444",
                    padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600"
                  }}>
                    {emi.status} {emi.daysLate ? `(${emi.daysLate}d late)` : ""}
                  </span>
                </td>
                <td style={{ padding: "15px 10px", textAlign: "right" }}>
                  {emi.status !== "Paid" && (
                    <button 
                      onClick={() => setSelectedEmi(emi)}
                      style={{ padding: "6px 12px", background: "var(--surface-color)", border: "1px solid var(--glass-border)", color: "var(--text-main)", borderRadius: "6px", fontSize: "12px" }}
                    >
                      Record
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={selectedEmi !== null}
        title="Record Payment"
        message={`Please confirm receipt of ₹${selectedEmi?.amount} for Loan ID ${selectedEmi?.loanId}. This will update the ledger.`}
        onConfirm={handleRecordPayment}
        onCancel={() => setSelectedEmi(null)}
      />
    </div>
  );
}

const BackButton = ({ setPage }) => (
  <button onClick={() => setPage("dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Dashboard
  </button>
);

export default RepaymentTracker;
