import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { DUMMY_VAULT } from "./mockData";

function GoldVault({ setPage }) {
  const [selectedVault, setSelectedVault] = useState(null);

  const handleRelease = () => {
    alert(`Gold Item ${selectedVault.id} marked as Released!`);
    setSelectedVault(null);
  }

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <BackButton setPage={setPage} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Gold Vault Inventory</h2>
        <div style={{ color: "#eab308", background: "rgba(234, 179, 8, 0.1)", padding: "10px 15px", borderRadius: "10px", fontWeight: "600" }}>
           Total Weight: {DUMMY_VAULT.reduce((acc, curr) => acc + curr.weight, 0)} g
        </div>
      </div>

      <div className="glass" style={{ padding: "30px", borderRadius: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ color: "var(--text-muted)", fontSize: "14px", borderBottom: "1px solid var(--glass-border)" }}>
              <th style={{ padding: "15px 10px" }}>Item ID</th>
              <th style={{ padding: "15px 10px" }}>Linked Loan</th>
              <th style={{ padding: "15px 10px" }}>Description</th>
              <th style={{ padding: "15px 10px" }}>Weight / Purity</th>
              <th style={{ padding: "15px 10px" }}>Status</th>
              <th style={{ padding: "15px 10px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_VAULT.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "15px 10px", color: "#eab308", fontWeight: "600" }}>{item.id}</td>
                <td style={{ padding: "15px 10px", color: "white" }}>{item.loanId}</td>
                <td style={{ padding: "15px 10px", color: "white" }}>{item.description}</td>
                <td style={{ padding: "15px 10px" }}>{item.weight}g / {item.purity}</td>
                <td style={{ padding: "15px 10px" }}>
                  <span style={{ 
                    background: item.status === "Pledged" ? "rgba(234, 179, 8, 0.1)" : "rgba(16, 185, 129, 0.1)", 
                    color: item.status === "Pledged" ? "#eab308" : "#10b981",
                    padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "15px 10px", textAlign: "right" }}>
                  {item.status === "Pledged" && (
                    <button 
                      onClick={() => setSelectedVault(item)}
                      style={{ padding: "6px 12px", background: "var(--surface-color)", border: "1px solid var(--glass-border)", color: "white", borderRadius: "6px", fontSize: "12px" }}
                    >
                      Release Gold
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={selectedVault !== null}
        title="Authorize Gold Release"
        message={`Are you sure you want to release ${selectedVault?.description} (${selectedVault?.weight}g)? Ensure Loan ${selectedVault?.loanId} has been fully settled and closed prior to release.`}
        onConfirm={handleRelease}
        onCancel={() => setSelectedVault(null)}
      />
    </div>
  );
}

const BackButton = ({ setPage }) => (
  <button onClick={() => setPage("dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Dashboard
  </button>
);

export default GoldVault;
