import React, { useState } from "react";
import { DUMMY_CUSTOMERS, DUMMY_LOANS } from "./mockData";

function CustomerProfile({ setPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = DUMMY_CUSTOMERS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm));

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "40px" }}>
      <BackButton setPage={setPage} />
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "25px" }}>Customer Profiles</h2>

      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Search by Name or Phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {filteredCustomers.map(customer => {
          const customerLoans = DUMMY_LOANS.filter(l => l.customerId === customer.id);
          return (
            <div key={customer.id} className="glass" style={{ padding: "30px", borderRadius: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--glass-border)", paddingBottom: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--surface-color)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px" }}>
                    👤
                  </div>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: "600", color: "white", marginBottom: "5px" }}>{customer.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "5px" }}>ID: {customer.id} • {customer.phone}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{customer.address}</p>
                  </div>
                </div>
                <div>
                  <div style={{ background: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", padding: "5px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "600" }}>
                    Aadhaar: {customer.aadhaar}
                  </div>
                </div>
              </div>

              {/* Loan History */}
              <h4 style={{ color: "var(--accent)", marginBottom: "15px", fontSize: "16px" }}>Loan History</h4>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ color: "var(--text-muted)", fontSize: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <th style={{ padding: "10px" }}>Loan ID</th>
                      <th style={{ padding: "10px" }}>Date</th>
                      <th style={{ padding: "10px" }}>Amount</th>
                      <th style={{ padding: "10px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerLoans.map(loan => (
                      <tr key={loan.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px 10px", fontWeight: "600", color: "white" }}>{loan.id}</td>
                        <td style={{ padding: "12px 10px" }}>{loan.startDate}</td>
                        <td style={{ padding: "12px 10px" }}>₹{loan.amount.toLocaleString()}</td>
                        <td style={{ padding: "12px 10px" }}>
                          <span style={{ 
                            background: loan.status === "Active" ? "rgba(16, 185, 129, 0.1)" : "var(--surface-color)", 
                            color: loan.status === "Active" ? "#10b981" : "var(--text-muted)",
                            padding: "4px 8px", borderRadius: "6px", fontSize: "12px" 
                          }}>
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

const BackButton = ({ setPage }) => (
  <button 
    onClick={() => setPage("dashboard")}
    style={{
      display: "flex", alignItems: "center", gap: "8px", background: "transparent",
      border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: 0
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    Back to Dashboard
  </button>
);

export default CustomerProfile;
