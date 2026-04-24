import { useState, useEffect } from "react";
import { API_URL } from "./config";
import { calculateElapsedInterestMonths, calculateMonthlyInterestAmount } from "./interestUtils";

function UserDashboard({ userPhone, setSelectedLoan, setPage }) {
  const [loans, setLoans] = useState({ active: [], closed: [], expiring: [] });
  const [userTransactions, setUserTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [loansRes, expiringRes] = await Promise.all([
          fetch(`${API_URL}/api/loans`),
          fetch(`${API_URL}/api/loans/expiring`)
        ]);

        const allLoans = await loansRes.json();
        const allExpiring = await expiringRes.json();

        if (Array.isArray(allLoans)) {
          const trimmedPhone = String(userPhone || "").trim();
          const userLoans = allLoans.filter(l => String(l.phone || "").trim() === trimmedPhone);

          const categorized = {
            active: userLoans.filter(l => l.status?.toLowerCase() !== "closed"),
            closed: userLoans.filter(l => l.status?.toLowerCase() === "closed"),
            expiring: []
          };

          if (Array.isArray(allExpiring)) {
            categorized.expiring = allExpiring.filter(l => String(l.phone || "").trim() === trimmedPhone);
          }

          setLoans(categorized);

          // Process Transactions
          const txList = [];
          userLoans.forEach(l => {
            if (l.date) {
              txList.push({
                id: `${l.id}-out`,
                name: l.item || "General Loan",
                type: "Loan Taken",
                amount: -parseFloat(l.amount),
                date: l.date
              });
            }
            if (l.status?.toLowerCase() === "closed" && l.repaymentDate) {
              txList.push({
                id: `${l.id}-in`,
                name: l.item || "General Loan",
                type: "Loan Settled",
                amount: parseFloat(l.amountPaid || l.amount),
                date: l.repaymentDate
              });
            }
          });
          txList.sort((a, b) => new Date(b.date) - new Date(a.date));
          setUserTransactions(txList.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userPhone) fetchUserData();
  }, [userPhone]);


  const renderLoanCard = (loan, type) => {
    const monthlyInterest = calculateMonthlyInterestAmount(loan.amount, loan.interest);
    const isClosed = type === "closed";

    return (
      <div
        key={loan._id || loan.id}
        className="glass-card fade-in"
        onClick={() => {
          setSelectedLoan(loan);
          setPage("loan-statement");
        }}
        style={{
          padding: "25px",
          borderRadius: "24px",
          border: "1.5px solid #000",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#ffffff",
          transition: "transform 0.3s ease",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer"
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Status Badge */}
        <div style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          padding: "4px 10px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "800",
          textTransform: "uppercase",
          background: type === "active" ? "rgba(16, 185, 129, 0.1)" : type === "expiring" ? "rgba(239, 68, 68, 0.1)" : "rgba(100, 116, 139, 0.1)",
          color: type === "active" ? "#10b981" : type === "expiring" ? "#ef4444" : "#64748b",
          border: `1px solid ${type === "active" ? "#10b981" : type === "expiring" ? "#ef4444" : "#64748b"}`
        }}>
          {type}
        </div>

        <div>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>ID: {loan._id || loan.id}</span>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", marginTop: "5px" }}>{loan.item || "General Loan"}</h3>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{isClosed ? "Final Amount" : "Principal Amount"}</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#111827" }}>₹{parseFloat(loan.amount).toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Applied On</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>{loan.date}</div>
          </div>
        </div>

        {!isClosed && (
          <div style={{
            padding: "16px",
            background: type === "expiring" ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            borderRadius: "16px",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 8px 16px -4px rgba(0,0,0,0.2)"
          }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "600", opacity: 0.9 }}>Monthly Interest</div>
              <div style={{ fontSize: "22px", fontWeight: "800" }}>₹{monthlyInterest.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", fontWeight: "600", opacity: 0.9 }}>Rate</div>
              <div style={{ fontSize: "16px", fontWeight: "800" }}>{loan.interest}%</div>
            </div>
          </div>
        )}

        {isClosed && (
          <div style={{
            padding: "16px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#64748b" }}>Status: Successfully Closed ✅</span>
          </div>
        )}

        <div style={{ marginTop: "10px", textAlign: "center", fontSize: "12px", color: "var(--primary)", fontWeight: "700" }}>
          View Statement →
        </div>
      </div>
    );
  };

  const TabButton = ({ id, label, count, color }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        background: activeTab === id ? color : "transparent",
        color: activeTab === id ? "#fff" : "#64748b",
        fontWeight: "700",
        fontSize: "15px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "all 0.2s ease",
        boxShadow: activeTab === id ? `0 4px 12px ${color}40` : "none"
      }}
    >
      {label}
      <span style={{
        background: activeTab === id ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
        padding: "2px 8px",
        borderRadius: "8px",
        fontSize: "12px"
      }}>{count}</span>
    </button>
  );

  const stats = {
    totalPrincipal: loans.active.reduce((sum, l) => sum + parseFloat(l.amount || 0), 0),
    activeCount: loans.active.length,
    goldWeight: loans.active
      .filter(l => l.category === "Gold" || (l.item || "").toLowerCase().includes("gold"))
      .reduce((sum, l) => sum + parseFloat(l.weight || 0), 0),
    silverWeight: loans.active
      .filter(l => l.category === "Silver" || (l.item || "").toLowerCase().includes("silver"))
      .reduce((sum, l) => sum + parseFloat(l.weight || 0), 0),
    monthlyInterest: loans.active.reduce((sum, l) => sum + calculateMonthlyInterestAmount(l.amount, l.interest), 0)
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <div className="loader" style={{ margin: "0 auto 20px" }}></div>
        <p style={{ color: "var(--text-muted)", fontSize: "18px", fontWeight: "600" }}>Syncing your records...</p>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      {/* Header & Personalization */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#111827", marginBottom: "8px" }}>
          Welcome back! 👋
        </h2>
        <p style={{ color: "#64748b", fontSize: "16px", fontWeight: "500" }}>
          Providing secure financial services for phone: <span style={{ color: "#111827", fontWeight: "700" }}>{userPhone}</span>
        </p>
      </div>

      {/* Finance Pulse - Summary Grid */}
      <div className="responsive-grid" style={{
        marginBottom: "var(--section-spacing)"
      }}>
        <SummaryCard
          title="Total Active Principal"
          value={`₹${stats.totalPrincipal.toLocaleString()}`}
          icon="💰"
          color="#6366f1"
        />
        <SummaryCard
          title="Monthly Interest"
          value={`₹${stats.monthlyInterest.toLocaleString()}`}
          icon="📈"
          color="#10b981"
          subtitle="Estimated total"
        />
        <SummaryCard
          title="Gold Assets"
          value={`${stats.goldWeight}g`}
          icon="✨"
          color="#eab308"
          subtitle="Total weight"
        />
        <SummaryCard
          title="Silver Assets"
          value={`${stats.silverWeight}g`}
          icon="🥈"
          color="#94a3b8"
          subtitle="Total weight"
        />
        <SummaryCard
          title="Active Loans"
          value={stats.activeCount}
          icon="📜"
          color="#8b5cf6"
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content-grid">

        {/* Left: Detailed Loan Tabs */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#111827" }}>Your Loan Records</h3>
            <div className="mobile-stack" style={{
              display: "flex",
              gap: "8px",
              background: "#f1f5f9",
              padding: "4px",
              borderRadius: "12px",
            }}>
              <TabButton id="active" label="Active" count={loans.active.length} color="#6366f1" compact />
              <TabButton id="expiring" label="Expiring" count={loans.expiring.length} color="#ef4444" compact />
              <TabButton id="closed" label="Closed" count={loans.closed.length} color="#64748b" compact />
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--card-gap)"
          }}>
            {loans[activeTab].length > 0 ? (
              loans[activeTab].map(loan => renderLoanCard(loan, activeTab))
            ) : (
              <EmptyState tab={activeTab} />
            )}
          </div>
        </div>

        {/* Right: Side Info / Recent Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div className="glass-card" style={{ padding: "20px", borderRadius: "24px", border: "1.5px solid #000" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>🕒</span> Recent Activity
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {userTransactions.length > 0 ? (
                userTransactions.map((tx, idx) => (
                  <div key={tx.id || idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: idx < userTransactions.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: tx.amount < 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        color: tx.amount < 0 ? "#ef4444" : "#10b981",
                        fontWeight: "700"
                      }}>
                        {tx.amount < 0 ? "↓" : "↑"}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>{tx.type}</div>
                        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>{tx.date}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: tx.amount < 0 ? "#ef4444" : "#10b981" }}>
                      {tx.amount < 0 ? "-" : "+"} ₹{Math.abs(tx.amount).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", padding: "20px 0" }}>
                  No recent activities found.
                </p>
              )}
            </div>
          </div>

          <div style={{
            padding: "25px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #311b5e 0%, #4a148c 100%)",
            color: "#fff",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
          }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Need Help?</h4>
            <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "20px", lineHeight: "1.5" }}>
              For new loan applications or gold releases, please visit our office or contact us at:
              <br />
              <strong style={{ fontSize: "16px", display: "block", marginTop: "10px" }}>📞 +91 9123456780</strong>
            </p>
            <button style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "#fff",
              color: "#311b5e",
              fontWeight: "700",
              cursor: "pointer"
            }}>
              Office Location →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const SummaryCard = ({ title, value, icon, color, subtitle }) => (
  <div style={{
    padding: "24px",
    background: "#fff",
    borderRadius: "24px",
    border: `1.5px solid #000`,
    boxShadow: `0 8px 0 #000`,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "24px" }}>{icon}</span>
      <span style={{
        fontSize: "12px",
        fontWeight: "800",
        color: color,
        textTransform: "uppercase",
        background: `${color}15`,
        padding: "4px 8px",
        borderRadius: "8px"
      }}>{title}</span>
    </div>
    <div>
      <div style={{ fontSize: "28px", fontWeight: "900", color: "#111827" }}>{value}</div>
      {subtitle && <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginTop: "2px" }}>{subtitle}</div>}
    </div>
  </div>
);

const TabButton = ({ id, label, count, color, activeTab, setActiveTab, compact }) => (
  <button
    onClick={() => setActiveTab(id)}
    style={{
      padding: compact ? "6px 12px" : "12px 24px",
      borderRadius: compact ? "8px" : "12px",
      border: "none",
      background: activeTab === id ? color : "transparent",
      color: activeTab === id ? "#fff" : "#64748b",
      fontWeight: "700",
      fontSize: compact ? "13px" : "15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s ease",
      boxShadow: activeTab === id ? `0 4px 12px ${color}40` : "none"
    }}
  >
    {label}
    <span style={{
      background: activeTab === id ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
      padding: "1px 6px",
      borderRadius: "6px",
      fontSize: "10px"
    }}>{count}</span>
  </button>
);

const EmptyState = ({ tab }) => (
  <div style={{
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "32px",
    border: "1.5px dashed #cbd5e1"
  }}>
    <div style={{ fontSize: "48px", marginBottom: "15px" }}>📭</div>
    <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>No {tab} loans found</h3>
    <p style={{ color: "#64748b", fontSize: "14px" }}>There are currently no records in this category.</p>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
    <div style={{ fontSize: "16px", fontWeight: "700", color: "#111827" }}>{value}</div>
  </div>
);

export default UserDashboard;
