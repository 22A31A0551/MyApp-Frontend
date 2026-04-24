import { useState } from "react";
import { API_URL } from "./config";

function LoanRepayment() {
  const [name, setName] = useState("");
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState("");

  const searchLoans = async () => {
    try {
      const res = await fetch(`${API_URL}/api/loans/search?name=${name}`);
      const result = await res.json();
      if (result && result.length > 0) {
        setLoans(result);
        setSelectedLoan(null);
      } else {
        alert("No loans found for this customer");
        setLoans([]);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching loan details");
    }
  };

  const calculateTotals = (loan) => {
    if (!loan) return { interest: 0, total: 0, months: 0 };

    const principal = parseFloat(loan.amount) || 0;
    const ratePerMonth = parseFloat(loan.interest) || 0; // Assuming interest is % per month

    const loanDate = new Date(loan.date);
    const today = new Date();

    if (isNaN(loanDate)) return { interest: 0, total: principal, months: 0 };

    const diffTime = Math.abs(today - loanDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Prorate months based on 30-day month, minimum 1 month
    let months = diffDays / 30;
    if (months < 1) months = 1;

    const interest = (principal * ratePerMonth * months) / 100;
    const total = principal + interest;

    return {
      interest: Math.round(interest),
      total: Math.round(total),
      months: months.toFixed(1)
    };
  };

  const handleRepay = async () => {
    if (!selectedLoan) return;

    try {
      const todayDate = new Date().toISOString().split("T")[0];

      // ✅ FIXED ENDPOINT
      const response = await fetch(
        `${API_URL}/api/loans/close/${selectedLoan.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          // ✅ SEND ONLY REQUIRED DATA
          body: JSON.stringify({
            repaymentDate: todayDate,
            amountPaid: repaymentAmount,
          }),
        }
      );

      if (response.ok) {
        alert(
          `✅ Loan Closed Successfully!\n\nCustomer: ${selectedLoan.name}\nDate: ${todayDate}\nAmount Paid: ₹${repaymentAmount}`
        );

        setSelectedLoan(null);
        setLoans([]);
        setName("");
        setRepaymentAmount("");
      } else {
        const text = await response.text();
        console.error("Backend error:", text);
        alert("❌ Error saving repayment data to the server.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error during repayment process.");
    }
  };

  const totals = selectedLoan ? calculateTotals(selectedLoan) : null;

  return (
    <div
      className="glass"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--card-padding)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>Loan Repayment</h2>
        <p style={{ color: "var(--text-muted)" }}>Search customer, select a loan, and calculate totals.</p>
      </div>

      {!selectedLoan ? (
        <>
          <div className="mobile-stack" style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "30px" }}>
            <input
              placeholder="Enter customer name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") searchLoans(); }}
              style={{
                flex: "1", maxWidth: "400px", padding: "12px 16px", borderRadius: "10px",
                background: "var(--surface-color)", border: "1px solid #000", color: "#000", outline: "none"
              }}
            />
            <button onClick={searchLoans} style={btnStyle("#6366f1")}>Search</button>
          </div>

          {loans.length > 0 && (
            <div className="glass" style={{ borderRadius: "12px", border: "1px solid var(--glass-border)", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "600px" }}>
                <thead>
                  <tr style={{ background: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Item</th>
                    <th style={thStyle}>Principal</th>
                    <th style={thStyle}>Interest</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                      <td style={tdStyle}>{loan.date || "N/A"}</td>
                      <td style={tdStyle}>{loan.name}</td>
                      <td style={tdStyle}>{loan.item}</td>
                      <td style={tdStyle}>₹{loan.amount}</td>
                      <td style={tdStyle}>{loan.interest}%/mo</td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setRepaymentAmount(calculateTotals(loan).total);
                          }}
                          style={{ ...btnStyle("#10b981"), padding: "6px 15px", fontSize: "14px" }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "20px", color: "var(--primary)" }}>Payment Overview</h3>
              <button onClick={() => setSelectedLoan(null)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>
                Back to List
              </button>
            </div>

            <div className="responsive-grid" style={{ marginBottom: "20px" }}>
              <div><span style={labelStyle}>Customer:</span> <span style={valStyle}>{selectedLoan.name}</span></div>
              <div><span style={labelStyle}>Item:</span> <span style={valStyle}>{selectedLoan.item}</span></div>
              <div><span style={labelStyle}>Loan Date:</span> <span style={valStyle}>{selectedLoan.date || "N/A"}</span></div>
              <div><span style={labelStyle}>Time Elapsed:</span> <span style={valStyle}>{totals.months} month(s)</span></div>
            </div>

            <div style={{ borderTop: "1px dashed var(--glass-border)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={labelStyle}>Principal Amount:</span>
                <span style={valStyle}>₹{parseFloat(selectedLoan.amount).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={labelStyle}>Calculated Interest ({selectedLoan.interest}%/mo):</span>
                <span style={{ ...valStyle, color: "#f59e0b" }}>+ ₹{totals.interest.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--glass-border)", paddingTop: "12px", marginTop: "4px" }}>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-main)" }}>Total Due Amount:</span>
                <span style={{ fontSize: "22px", fontWeight: "700", color: "#10b981" }}>₹{totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "12px", border: "1px solid var(--glass-border)" }}>
            <label style={{ display: "block", marginBottom: "10px", color: "var(--text-main)", fontWeight: "500" }}>Entering Repayment Amount (₹)</label>
            <input
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              placeholder="Enter amount being paid"
              style={{
                width: "100%", padding: "16px", borderRadius: "10px", fontSize: "18px", fontWeight: "600",
                background: "var(--surface-color)", border: "1px solid #000", color: "#000", outline: "none",
                marginBottom: "20px"
              }}
            />

            <div className="mobile-stack" style={{ display: "flex", gap: "15px" }}>
              <button onClick={handleRepay} style={{ ...btnStyle("#10b981"), flex: 1, padding: "15px", fontSize: "16px" }}>Confirm Payment</button>
              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setRepaymentAmount("");
                }}
                style={{ ...btnStyle("transparent", "var(--text-main)", "1px solid var(--glass-border)"), padding: "15px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "16px", fontWeight: "600", color: "var(--text-main)", fontSize: "14px", textTransform: "uppercase" };
const tdStyle = { padding: "16px", color: "var(--text-muted)", fontSize: "15px" };
const labelStyle = { color: "#000", fontSize: "14px", fontWeight: "600" };
const valStyle = { color: "#000", fontWeight: "500", fontSize: "15px" };

const btnStyle = (bg, color = "white", border = "none") => ({
  padding: "12px 25px",
  background: bg,
  color: color,
  border: border,
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s"
});

export default LoanRepayment;
