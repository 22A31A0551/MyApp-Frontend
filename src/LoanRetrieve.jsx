import { useState } from "react";
import { API_URL } from "./config";

function LoanRetrieve() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const search = async () => {
    try {
      const res = await fetch(`${API_URL}/api/loans/search?name=${name}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
  };

  return (
    <div 
      className="glass" 
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>Loan Retrieval</h2>
        <p style={{ color: "var(--text-muted)" }}>Search your customer records instantly.</p>
      </div>

      {/* Search Box */}
      <div className="mobile-stack" style={{
        display: "flex",
        gap: "15px",
        marginBottom: "30px",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <input
          placeholder="Enter customer name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1",
            maxWidth: "400px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "var(--surface-color)",
            border: "1px solid #000",
            color: "#000",
            outline: "none"
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />

        <button 
          onClick={search} 
          style={{
            padding: "12px 30px", 
            background: "var(--primary)", 
            color: "white", 
            border: "none", 
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* Table container for overflow handling */}
      <div style={{
        background: "var(--surface-color)",
        borderRadius: "12px",
        border: "1px solid var(--glass-border)",
        overflowX: "auto"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left"
        }}>
          <thead>
            <tr style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid var(--glass-border)"
            }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Item</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((loan) => (
                <tr key={loan.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <td style={tdStyle}>{loan.name}</td>
                  <td style={tdStyle}>{loan.phone}</td>
                  <td style={tdStyle}>₹{loan.amount}</td>
                  <td style={tdStyle}>{loan.item}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "var(--text-muted)"
                }}>
                  No records found.
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
  padding: "16px",
  fontWeight: "600",
  color: "var(--text-main)",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const tdStyle = {
  padding: "16px",
  color: "#000000",
  fontSize: "15px",
  fontWeight: "500"
};

export default LoanRetrieve;