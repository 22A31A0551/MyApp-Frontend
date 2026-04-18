import { useState } from "react";

function LoanRetrieve() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const search = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/loans/search?name=${name}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
  };

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
          Records Directory
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", fontWeight: "500" }}>Retrieve secure transaction history and active loan records.</p>
      </div>

      {/* Search Box */}
      <div style={{
        display: "flex",
        gap: "15px",
        marginBottom: "40px",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{ position: "relative", flex: "1", maxWidth: "500px" }}>
          <input
            placeholder="Search by customer name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "50px"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
          <svg
            style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <button 
          onClick={search} 
          className="btn-primary"
          style={{
            padding: "0 35px", 
            height: "56px"
          }}
        >
          Execute Search
        </button>
      </div>

      {/* Table container */}
      <div style={{
        background: "var(--surface-low)",
        borderRadius: "20px",
        border: "1px solid var(--surface-high)",
        overflow: "hidden"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left"
        }}>
          <thead>
            <tr style={{
              background: "var(--surface-mid)",
              borderBottom: "1px solid var(--surface-high)"
            }}>
              <th style={thStyle}>Client Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Sanctioned Amount</th>
              <th style={thStyle}>Collateral Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((loan, idx) => (
                <tr key={loan.id} style={{ 
                  borderBottom: idx === data.length - 1 ? "none" : "1px solid var(--surface-high)",
                  transition: "var(--transition)"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "var(--surface-high)"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={tdStyle}>{loan.name}</td>
                  <td style={tdStyle}>{loan.phone}</td>
                  <td style={{ ...tdStyle, color: "#10b981", fontWeight: "700" }}>₹{loan.amount}</td>
                  <td style={tdStyle}>{loan.item}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{
                  padding: "60px",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontSize: "15px"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span style={{ fontWeight: "500" }}>No records found in current database.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "20px 24px",
  fontWeight: "800",
  color: "var(--primary)",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
};

const tdStyle = {
  padding: "20px 24px",
  color: "var(--text-main)",
  fontSize: "15px",
  fontWeight: "600"
};

export default LoanRetrieve;