import { useState, useEffect } from "react";

function ClosedLoans() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClosedLoans = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/loans`);
      if (res.ok) {
        const result = await res.json();
        const closed = result.filter(loan => loan.status === "Closed");
        setData(closed);
      } else {
        console.error("Error fetching loans");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedLoans();
  }, []);

  const filteredData = data.filter(loan => 
    loan.name && loan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Archive Vault
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", fontWeight: "500" }}>Historical records of successfully settled and closed accounts.</p>
      </div>

      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "350px" }}>
          <input 
            type="text" 
            placeholder="Search archived beneficiaries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 10px 10px 40px",
              borderRadius: "8px",
              border: "1px solid #000",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#000",
              outline: "none"
            }}
          />
          <svg style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      <div style={{ 
        background: "var(--surface-low)", 
        borderRadius: "20px", 
        border: "1px solid var(--surface-high)", 
        overflow: "hidden" 
      }}>
        {loading ? (
          <div style={{ padding: "80px", textAlign: "center" }}>
            <div style={{ fontSize: "18px", color: "var(--primary)", fontWeight: "700" }}>Accessing secure archives...</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--surface-mid)", borderBottom: "1px solid var(--surface-high)" }}>
                <th style={thStyle}>Client Name</th>
                <th style={thStyle}>Asset Detail</th>
                <th style={thStyle}>Closure Date</th>
                <th style={thStyle}>Final Settlement</th>
                <th style={thStyle}>Verification</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((loan, idx) => (
                  <tr key={loan.id} style={{ 
                    borderBottom: idx === filteredData.length - 1 ? "none" : "1px solid var(--surface-high)",
                    transition: "var(--transition)"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--surface-high)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={tdStyle}>{loan.name}</td>
                    <td style={tdStyle}>{loan.item}</td>
                    <td style={tdStyle}>{loan.repaymentDate || "N/A"}</td>
                    <td style={{ ...tdStyle, color: "#10b981", fontWeight: "700" }}>₹{loan.amountPaid || loan.amount}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        background: "#ecfdf5", color: "#10b981", 
                        padding: "6px 14px", borderRadius: "12px", fontSize: "11px", fontWeight: "800",
                        letterSpacing: "1px", border: "1px solid #d1fae5"
                      }}>
                        SETTLED
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "80px", textAlign: "center", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span style={{ fontWeight: "500" }}>No historical records match your search criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const thStyle = { padding: "16px", fontWeight: "600", color: "var(--text-main)", fontSize: "14px", textTransform: "uppercase" };
const tdStyle = { padding: "16px", color: "#000000", fontSize: "15px", fontWeight: "500" };

export default ClosedLoans;

