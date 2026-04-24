import { useEffect, useState } from "react";
import { API_URL } from "./config";

function ExpiringLoans({ userRole, userPhone }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentStatus, setSentStatus] = useState(() => {
    const saved = localStorage.getItem("sentRemindersStatus");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    fetch(`${API_URL}/api/loans/expiring`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          if (userRole === "admin") {
            setLoans(data);
          } else {
            // Filter only for this customer
            const trimmedPhone = String(userPhone || "").trim();
            const filtered = data.filter(loan => String(loan.phone || "").trim() === trimmedPhone);
            setLoans(filtered);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userRole, userPhone]);

  // FINAL REMINDER FUNCTION (backend call) - Admin Only
  const handleSendReminder = async (loan) => {
    if (userRole !== "admin") return;
    try {
      const id = loan._id || loan.id;
      const res = await fetch(`${API_URL}/api/loans/send-reminder/${id}`);
      if (!res.ok) throw new Error("API failed");
      alert("Reminder sent successfully ✅");
      setSentStatus(prev => {
        const updated = { ...prev, [id]: true };
        localStorage.setItem("sentRemindersStatus", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Reminder error:", err);
      alert("Failed to send reminder ❌");
    }
  };

  return (
    <div 
      className="glass" 
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "var(--text-main)" }}>
          Expiring Loans
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          {userRole === "admin" 
            ? "Customers requiring immediate reminders." 
            : "Your loans requiring immediate attention for repayment."}
        </p>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{ background: "var(--surface-color)", borderRadius: "12px", border: "1px solid var(--glass-border)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan) => (
                  <tr key={loan._id || loan.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={{...tdStyle, fontWeight: "600", color: "var(--text-main)"}}>{loan.name}</td>
                    <td style={tdStyle}>{loan.item || "N/A"}</td>
                    <td style={{...tdStyle, color: "#ef4444", fontWeight: "700"}}>₹{loan.amount}</td>
                    <td style={tdStyle}>{loan.phone || "N/A"}</td>
                    <td style={tdStyle}>{loan.date ? new Date(loan.date).toLocaleDateString() : "N/A"}</td>
                    <td style={tdStyle}>
                      {userRole === "admin" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <button 
                            onClick={() => handleSendReminder(loan)}
                            style={{
                              background: "var(--primary)",
                              color: "white",
                              border: "none",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontWeight: "600",
                              fontSize: "13px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "var(--transition)"
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            Send Reminder
                          </button>
                          {sentStatus[loan._id || loan.id] && (
                            <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Reminder Sent
                            </span>
                          )}
                        </div>
                      ) : (
                        <div style={{ 
                          color: "#ef4444", 
                          fontSize: "13px", 
                          fontWeight: "800", 
                          maxWidth: "200px",
                          lineHeight: "1.4"
                        }}>
                          Contact the office for the repayment of loan immediately
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                    No expiring loans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "16px", fontWeight: "600", color: "var(--text-main)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" };
const tdStyle = { padding: "16px", color: "#000000", fontSize: "15px", fontWeight: "500" };

export default ExpiringLoans;