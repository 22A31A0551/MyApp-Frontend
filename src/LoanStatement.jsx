import React from "react";
import { calculateElapsedInterestMonths, calculateMonthlyInterestAmount } from "./interestUtils";

function LoanStatement({ loan, setPage }) {
  if (!loan) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>No loan selected.</p>
        <button onClick={() => setPage("home")} className="btn-primary">Back to Dashboard</button>
      </div>
    );
  }

  const monthsElapsed = calculateElapsedInterestMonths(loan.createdAt, loan.date);
  const monthlyInterest = calculateMonthlyInterestAmount(loan.amount, loan.interest);
  const totalInterest = monthlyInterest * monthsElapsed;
  const totalDue = parseFloat(loan.amount) + totalInterest;

  return (
    <div className="fade-in" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Back Button */}
      <button
        onClick={() => setPage("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "none",
          color: "#64748b",
          marginBottom: "30px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Dashboard
      </button>

      <div style={{
        background: "#ffffff",
        borderRadius: "32px",
        padding: "var(--card-padding)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        border: "2px solid #000",
        position: "relative"
      }}>
        {/* Header */}
        <header className="mobile-stack" style={{ 
          borderBottom: "2px solid #f1f5f9", 
          paddingBottom: "20px", 
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#6366f1" }}></div>
              <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", color: "#6366f1", letterSpacing: "1px" }}>Official Loan Statement</span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#111827", margin: 0 }}>{loan.item || "Gold Loan"}</h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "5px", fontWeight: "600" }}>Ref: {loan.id}</p>
          </div>
          <div>
            <div style={{ 
              padding: "4px 12px", 
              borderRadius: "50px", 
              background: loan.status === "closed" ? "#f1f5f9" : "#ecfdf5", 
              color: loan.status === "closed" ? "#64748b" : "#10b981",
              fontWeight: "800",
              fontSize: "11px",
              border: `1.5px solid ${loan.status === "closed" ? "#64748b" : "#10b981"}`,
              whiteSpace: "nowrap"
            }}>
              {loan.status?.toUpperCase() || "ACTIVE"}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="responsive-grid" style={{ marginBottom: "40px" }}>
          <section>
            <h3 style={sectionTitleStyle}>Customer Details</h3>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Name</span>
              <span style={valueStyle}>{loan.name}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Phone Number</span>
              <span style={valueStyle}>{loan.phone}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Address</span>
              <span style={valueStyle}>{loan.address || "N/A"}</span>
            </div>
          </section>

          <section>
            <h3 style={sectionTitleStyle}>Loan Information</h3>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Principal Amount</span>
              <span style={valueStyle}>₹{parseFloat(loan.amount).toLocaleString()}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Interest Rate</span>
              <span style={valueStyle}>{loan.interest}% Per Month</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Application Date</span>
              <span style={valueStyle}>{loan.date}</span>
            </div>
          </section>
        </div>

        {/* Interest Summary Card */}
        <div style={{
          background: "#f8fafc",
          borderRadius: "24px",
          padding: "30px",
          border: "1.5px solid #e2e8f0",
          marginBottom: "40px"
        }}>
          <h3 style={{ ...sectionTitleStyle, border: "none", padding: 0, marginBottom: "20px" }}>Interest Accumulation Summary</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontWeight: "600" }}>Total Months Elapsed</span>
              <span style={{ fontWeight: "800", color: "#111827", fontSize: "18px" }}>{monthsElapsed} Months</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontWeight: "600" }}>Calculated Monthly Interest</span>
              <span style={{ fontWeight: "800", color: "#111827", fontSize: "18px" }}>₹{monthlyInterest.toLocaleString()}</span>
            </div>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              paddingTop: "15px",
              marginTop: "5px",
              borderTop: "2px dashed #cbd5e1"
            }}>
              <span style={{ color: "#111827", fontWeight: "800" }}>Total Interest Added</span>
              <span style={{ fontWeight: "900", color: "#ef4444", fontSize: "24px" }}>₹{totalInterest.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Total Payoff Hero */}
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          borderRadius: "20px",
          padding: "25px",
          textAlign: "center",
          color: "#ffffff",
          boxShadow: "0 10px 20px -5px rgba(49, 46, 129, 0.2)"
        }}>
          <div style={{ fontSize: "13px", fontWeight: "600", opacity: 0.8, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Estimated Total Payoff</div>
          <div style={{ fontSize: "32px", fontWeight: "900" }}>₹{totalDue.toLocaleString()}</div>
          <div style={{ fontSize: "12px", fontWeight: "500", opacity: 0.7, marginTop: "8px" }}>
            * Principal + Total Interest up to {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}.
          </div>
        </div>

        {/* Print Action (Optional aesthetic) */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button 
            style={{ 
              background: "transparent", 
              border: "1px solid #cbd5e1", 
              padding: "10px 20px", 
              borderRadius: "10px", 
              fontSize: "14px", 
              fontWeight: "700", 
              color: "#64748b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "0 auto"
            }}
            onClick={() => window.print()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Download / Print Statement
          </button>
        </div>
      </div>
    </div>
  );
}

const sectionTitleStyle = {
  fontSize: "14px",
  fontWeight: "800",
  textTransform: "uppercase",
  color: "#94a3b8",
  letterSpacing: "0.5px",
  marginBottom: "15px",
  paddingBottom: "8px",
  borderBottom: "1px solid #f1f5f9"
};

const detailRowStyle = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column"
};

const labelStyle = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: "600"
};

const valueStyle = {
  fontSize: "16px",
  color: "#111827",
  fontWeight: "700"
};

export default LoanStatement;
