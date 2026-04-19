import React, { useState, useEffect } from "react";

const Transactions = ({ setPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcess = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/loans");
        const loans = await res.json();

        if (Array.isArray(loans)) {
          const list = [];
          loans.forEach(loan => {
            // 1. Transaction: Money Given (Loan Entry)
            if (loan.date) {
              list.push({
                tid: `${loan.id}-out`,
                name: loan.name,
                type: "Loan Given",
                amount: -parseFloat(loan.amount),
                date: loan.date,
                time: "10:30 AM" // Fallback if no specific time field
              });
            }
            // 2. Transaction: Money Received (Loan Closed)
            if (loan.status?.toLowerCase() === "closed" && loan.repaymentDate) {
              list.push({
                tid: `${loan.id}-in`,
                name: loan.name,
                type: "Payment Received",
                amount: parseFloat(loan.amountPaid || loan.amount),
                date: loan.repaymentDate,
                time: "03:45 PM" // Fallback
              });
            }
          });

          // Sort by date descending
          list.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTransactions(list);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcess();
  }, []);

  const availableYears = (() => {
    const years = new Set([new Date().getFullYear()]);
    transactions.forEach(t => {
      const y = new Date(t.date).getFullYear();
      if (!isNaN(y)) years.add(y);
    });
    return Array.from(years).sort((a, b) => b - a);
  })();

  const filteredTransactions = transactions.filter(t =>
    new Date(t.date).getFullYear() === selectedYear
  );

  if (loading) return <div style={{ textAlign: "center", padding: "50px", color: "#000" }}>Loading Transactions...</div>;

  return (
    <div className="fade-in" style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#111827" }}>Transaction History</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label style={{ fontWeight: "700", color: "#64748b" }}>Filter Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{
              padding: "10px 20px", borderRadius: "10px", border: "1.5px solid #000",
              background: "white", fontWeight: "700", outline: "none", cursor: "pointer"
            }}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-card" style={{ borderRadius: "24px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.03)", borderBottom: "1.5px solid #000" }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Transaction Type</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.tid} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: "700", color: "#000" }}>{t.date}</div>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "600", color: "#000" }}>{t.name}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700",
                      background: t.amount < 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      color: t.amount < 0 ? "#ef4444" : "#10b981"
                    }}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: "800", color: t.amount < 0 ? "#ef4444" : "#10b981", fontSize: "17px" }}>
                    {t.amount < 0 ? "-" : "+"} ₹{Math.abs(t.amount).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                  No transactions found for the year {selectedYear}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { padding: "20px", textAlign: "left", fontSize: "14px", fontWeight: "800", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" };
const tdStyle = { padding: "20px", fontSize: "15px" };

export default Transactions;
