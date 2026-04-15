import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function LoanApplication({ setPage }) {
  const [form, setForm] = useState({
    name: "", phone: "", item: "", weight: "", purity: "22K",
    amount: "", tenure: "", rate: "2.0"
  });
  
  const [goldRate] = useState(7000); // 7000 INR per gram
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Auto LTV Calculator (75% of Gold Value)
  const calculateLTV = () => {
    if (!form.weight) return 0;
    let purityMultiplier = form.purity === "24K" ? 1.0 : form.purity === "22K" ? 0.916 : 0.75;
    let totalGoldValue = form.weight * goldRate * purityMultiplier;
    return Math.floor(totalGoldValue * 0.75);
  };

  const maxLoan = calculateLTV();

  const handleSubmit = () => {
    // Usually api call happens here
    alert("Loan Data Submitted Successfully!");
    setShowConfirm(false);
    setPage("dashboard");
  };

  return (
    <div className="fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <BackButton setPage={setPage} />
      
      <div className="glass" style={{ padding: "40px", borderRadius: "20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>New Loan Application</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Today's Gold Rate: <span style={{color: "#eab308", fontWeight: "600"}}>₹{goldRate}/g</span> (Used for LTV calc)</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ gridColumn: "1 / -1", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px", marginBottom: "10px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)" }}>Customer Details</h3>
          </div>
          <InputGroup label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <InputGroup label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />

          <div style={{ gridColumn: "1 / -1", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px", marginBottom: "10px", marginTop: "10px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)" }}>Gold Details</h3>
          </div>
          <InputGroup label="Item Description" name="item" value={form.item} onChange={handleChange} placeholder="e.g. 2 Bangles" />
          <InputGroup label="Total Weight (g)" name="weight" type="number" value={form.weight} onChange={handleChange} />
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", color: "var(--text-muted)" }}>Purity</label>
            <select 
              name="purity" value={form.purity} onChange={handleChange}
              style={{ padding: "12px", borderRadius: "10px", background: "var(--surface-color)", color: "white", border: "1px solid var(--glass-border)", outline: "none" }}
            >
              <option value="24K">24K (99.9%)</option>
              <option value="22K">22K (91.6%)</option>
              <option value="18K">18K (75.0%)</option>
            </select>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "flex-end" }}>
            <div style={{ background: "rgba(34, 211, 238, 0.1)", color: "#22d3ee", padding: "12px", borderRadius: "10px", textAlign: "center", border: "1px dashed rgba(34, 211, 238, 0.3)" }}>
              Max LTV Amount: <strong style={{fontSize: "18px"}}>₹{maxLoan.toLocaleString()}</strong>
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px", marginBottom: "10px", marginTop: "10px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)" }}>Loan Request</h3>
          </div>
          <InputGroup label="Requested Amount (₹)" name="amount" type="number" value={form.amount} onChange={handleChange} />
          <InputGroup label="Tenure (Months)" name="tenure" type="number" value={form.tenure} onChange={handleChange} />
          <InputGroup label="Flat Interest Rate (%)" name="rate" type="number" value={form.rate} onChange={handleChange} />
        </div>

        <button 
          onClick={() => setShowConfirm(true)}
          style={{ width: "100%", padding: "15px", background: "var(--primary)", color: "white", borderRadius: "10px", fontSize: "16px", fontWeight: "600", marginTop: "30px", border: "none" }}
        >
          Proceed to Disburse
        </button>
      </div>

      <ConfirmModal 
        isOpen={showConfirm}
        title="Approve & Disburse Loan"
        message={`You are about to approve a loan of ₹${form.amount} at ${form.rate}% interest for ${form.tenure} months. This will move the gold to the Active Vault.`}
        onConfirm={handleSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

const InputGroup = ({ label, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</label>
    <input style={{ width: "100%" }} {...props} />
  </div>
);

const BackButton = ({ setPage }) => (
  <button onClick={() => setPage("dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Dashboard
  </button>
);

export default LoanApplication;
