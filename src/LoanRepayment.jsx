import { useState } from "react";

function LoanRepayment() {
  const [name, setName] = useState("");
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState("");

  const searchLoans = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/loans/search?name=${name}`);
      const result = await res.json();
      if (result && result.length > 0) {
        setLoans(result);
        setSelectedLoan(null);
      } else {
        alert("No active loans found for this customer record.");
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
    const ratePerMonth = parseFloat(loan.interest) || 0;
    
    const loanDate = new Date(loan.date);
    const today = new Date();
    
    if (isNaN(loanDate)) return { interest: 0, total: principal, months: 0 };
    
    const diffTime = Math.abs(today - loanDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
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
      const response = await fetch(
        `http://localhost:8080/api/loans/close/${selectedLoan.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            repaymentDate: todayDate,
            amountPaid: repaymentAmount,
          }),
        }
      );

      if (response.ok) {
        alert(`✅ Secure Disposal Confirmed\n\nClient: ${selectedLoan.name}\nAmount Settled: ₹${repaymentAmount}`);
        setSelectedLoan(null);
        setLoans([]);
        setName("");
        setRepaymentAmount("");
      } else {
        alert("❌ Error processing the secure repayment.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Critical server error during disposal process.");
    }
  };

  const totals = selectedLoan ? calculateTotals(selectedLoan) : null;

  return (
    <div 
      className="fade-in glass-card" 
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        padding: "50px",
        background: "var(--surface-lowest)",
        border: "1px solid var(--surface-high)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", marginBottom: "12px", color: "var(--text-main)", letterSpacing: "-1.5px" }}>
          Loan Disposal Hub
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", fontWeight: "500" }}>Process repayments and finalize account closures securely.</p>
      </div>

      {!selectedLoan ? (
        <>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "40px" }}>
            <div style={{ position: "relative", flex: "1", maxWidth: "500px" }}>
              <input
                placeholder="Search beneficiary record..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") searchLoans(); }}
                style={{
                  width: "100%", paddingLeft: "50px"
                }}
              />
              <svg style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <button onClick={searchLoans} className="btn-primary" style={{ padding: "0 35px", height: "56px" }}>Initialize Search</button>
          </div>

          {loans.length > 0 && (
            <div style={{ background: "var(--surface-low)", borderRadius: "20px", border: "1px solid var(--surface-high)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--surface-mid)", borderBottom: "1px solid var(--surface-high)" }}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Client</th>
                    <th style={thStyle}>Collateral</th>
                    <th style={thStyle}>Principal</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} style={{ borderBottom: "1px solid var(--surface-high)" }}>
                      <td style={tdStyle}>{loan.date || "N/A"}</td>
                      <td style={tdStyle}>{loan.name}</td>
                      <td style={tdStyle}>{loan.item}</td>
                      <td style={{ ...tdStyle, color: "var(--text-main)", fontWeight: "700" }}>₹{loan.amount}</td>
                      <td style={tdStyle}>
                        <button 
                          onClick={() => {
                            setSelectedLoan(loan);
                            setRepaymentAmount(calculateTotals(loan).total);
                          }} 
                          style={{
                            padding: "8px 18px", background: "var(--surface-high)", color: "var(--primary)",
                            border: "1px solid var(--primary)", borderRadius: "10px", fontWeight: "700",
                            fontSize: "13px", cursor: "pointer", transition: "var(--transition)"
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = "var(--surface-high)"; e.currentTarget.style.color = "var(--primary)"; }}
                        >
                          Select Record
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
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "start" }}>
          {/* Detail Card */}
          <div className="glass-card" style={{ 
            padding: "40px", background: "var(--surface-lowest)", 
            border: "1px solid var(--surface-high)", borderRadius: "24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "900", color: "var(--primary)", letterSpacing: "-0.5px" }}>Transaction Breakdown</h3>
              <button 
                onClick={() => setSelectedLoan(null)} 
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", fontWeight: "600", textDecoration: "underline" }}
              >
                Change Selection
              </button>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "35px" }}>
              <div style={infoGroupStyle}><span className="label-small">Client Name</span><span style={valStyle}>{selectedLoan.name}</span></div>
              <div style={infoGroupStyle}><span className="label-small">Collateral Type</span><span style={valStyle}>{selectedLoan.item}</span></div>
              <div style={infoGroupStyle}><span className="label-small">Origination Date</span><span style={valStyle}>{selectedLoan.date || "N/A"}</span></div>
              <div style={infoGroupStyle}><span className="label-small">Term Duration</span><span style={valStyle}>{totals.months} month(s)</span></div>
            </div>

            <div style={{ borderTop: "1px solid var(--surface-high)", paddingTop: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="label-small" style={{ fontSize: "14px" }}>Sanctioned Principal</span> 
                <span style={valStyle}>₹{parseFloat(selectedLoan.amount).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="label-small" style={{ fontSize: "14px" }}>Accrued Interest ({selectedLoan.interest}%/mo)</span> 
                <span style={{...valStyle, color: "var(--primary)"}}>+ ₹{totals.interest.toLocaleString()}</span>
              </div>
              <div style={{ 
                display: "flex", justifyContent: "space-between", 
                borderTop: "2px solid var(--surface-high)", 
                paddingTop: "20px", marginTop: "10px",
                background: "var(--surface-low)",
                margin: "10px -15px 0",
                padding: "20px",
                borderRadius: "12px"
              }}>
                <span style={{ fontSize: "16px", fontWeight: "900", color: "var(--text-main)" }}>Total Settlement Due:</span> 
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#10b981", letterSpacing: "-1px" }}>₹{totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Action Card */}
          <div className="glass-card" style={{ 
            background: "var(--surface-lowest)", 
            padding: "40px", borderRadius: "24px", border: "1px solid var(--surface-high)",
            position: "sticky", top: "20px"
          }}>
            <h4 style={{ color: "var(--text-main)", marginBottom: "20px", fontWeight: "800" }}>Finalize Disposal</h4>
            <label className="label-small" style={{ marginBottom: "12px", display: "block" }}>Settlement Amount (₹)</label>
            <input 
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              placeholder="Confirm final amount"
              style={{
                width: "100%", padding: "20px", borderRadius: "16px", fontSize: "22px", fontWeight: "800",
                background: "var(--surface-low)", border: "1px solid var(--primary)", color: "#10b981", outline: "none",
                marginBottom: "30px", textAlign: "center", letterSpacing: "1px"
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <button 
                onClick={handleRepay} 
                className="btn-primary"
                style={{ width: "100%", padding: "20px", fontSize: "16px" }}
              >
                Secure Account Closure
              </button>
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px", fontWeight: "500" }}>Finalizing will mark this record as "CLOSED" in the master directory.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "20px 24px", fontWeight: "800", color: "var(--primary)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px" };
const tdStyle = { padding: "20px 24px", color: "var(--text-main)", fontSize: "15px", fontWeight: "600" };
const valStyle = { color: "var(--text-main)", fontWeight: "800", fontSize: "16px" };
const infoGroupStyle = { display: "flex", flexDirection: "column", gap: "4px" };

export default LoanRepayment;

