import { useState, useEffect } from "react";
import { API_URL } from "./config";

function ClosedLoans() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClosedLoans = async () => {
    try {
      // Assuming GET /api/loans returns all loans
      const res = await fetch(`${API_URL}/api/loans`);
      if (res.ok) {
        const result = await res.json();
        // Filter loans with status 'Closed'
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
      className="glass fade-in" 
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--card-padding)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>Closed Loans</h2>
        <p style={{ color: "var(--text-muted)" }}>History of successfully paid and closed accounts.</p>
      </div>

      <div className="mobile-stack" style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search by name..." 
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
        </div>
      </div>

      <div style={{ background: "var(--surface-color)", borderRadius: "12px", border: "1px solid var(--glass-border)", overflowX: "auto" }}>
        {loading ? (
          <p style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>Loading records...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Date Closed</th>
                <th style={thStyle}>Amount Paid</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((loan) => (
                  <tr key={loan.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={tdStyle}>{loan.name}</td>
                    <td style={tdStyle}>{loan.item}</td>
                    <td style={tdStyle}>{loan.repaymentDate || "N/A"}</td>
                    <td style={{ ...tdStyle, color: "#10b981", fontWeight: "600" }}>₹{loan.amountPaid || loan.amount}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        background: "rgba(16, 185, 129, 0.2)", color: "#10b981", 
                        padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" 
                      }}>
                        CLOSED
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                    No closed loans found in the system.
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
