import { useState, useEffect } from "react";
import { API_URL } from "./config";
import Navbar from "./Navbar";

import LoanEntry from "./LoanEntry";
import LoanRetrieve from "./LoanRetrieve";
import LoanRepayment from "./LoanRepayment";
import LoanManage from "./LoanManage";
import ClosedLoans from "./ClosedLoans";
import Login from "./Login";
import Landing from "./Landing";
import Analytics from "./Analytics";
import Transactions from "./Transactions";
import ExpiringLoans from "./ExpiringLoans";
import Footer from "./Footer";
import UserDashboard from "./UserDashboard";
import LoanStatement from "./LoanStatement";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem("userPhone") || "";
  });
  const [page, setPage] = useState("home");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    document.title = "Srinu Bankers";
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userPhone");
      setUserPhone("");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userPhone) localStorage.setItem("userPhone", userPhone);
  }, [userPhone]);

  useEffect(() => {
    if (userRole) localStorage.setItem("userRole", userRole);
  }, [userRole]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/loans`);
        const loans = await res.json();
        if (Array.isArray(loans)) {
          const list = [];
          loans.forEach(loan => {
            if (loan.date) {
              list.push({
                tid: `${loan.id}-out`,
                name: loan.name,
                type: "Loan Given",
                amount: -parseFloat(loan.amount),
                date: loan.date,
                time: "10:30 AM"
              });
            }
            if (loan.status?.toLowerCase() === "closed" && loan.repaymentDate) {
              list.push({
                tid: `${loan.id}-in`,
                name: loan.name,
                type: "Payment Received",
                amount: parseFloat(loan.amountPaid || loan.amount),
                date: loan.repaymentDate,
                time: "03:45 PM"
              });
            }
          });
          list.sort((a, b) => new Date(b.date) - new Date(a.date));
          setRecentTransactions(list.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoggedIn && userRole === "admin") fetchRecent();
  }, [isLoggedIn, userRole, page]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Navbar
        setShowLogin={setShowLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
        userRole={userRole}
        userPhone={userPhone}
        setPage={setPage}
        setSelectedLoan={setSelectedLoan}
      />

      <main style={{ 
        paddingTop: "var(--section-spacing)", 
        paddingBottom: "40px", 
        paddingLeft: "20px", 
        paddingRight: "20px",
        marginTop: "60px"
      }}>
        {!isLoggedIn ? (
          <Landing />
        ) : (
          <>
            {page === "home" && (
              <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto" }}>

                {/* Hero Section */}
                <section style={{ textAlign: "center", marginBottom: "var(--section-spacing)" }}>
                  <h1 className="hero-title" style={{
                    fontWeight: "800",
                    marginBottom: "16px",
                    color: "#111827",
                    letterSpacing: "-0.5px"
                  }}>
                    Srinu Bankers
                  </h1>
                  <p style={{ 
                    color: "#000000", 
                    fontSize: "1.1rem", 
                    fontWeight: "500", 
                    maxWidth: "600px", 
                    margin: "0 auto",
                    padding: "0 15px" 
                  }}>
                    {userRole === "admin"
                      ? "Securely manage loans, track transactions, and stay on top of your finance business."
                      : "View your active loans, track payments, and securely process your transactions."}
                  </p>
                </section>

                {/* Conditional Display for Admin vs User */}
                {userRole === "admin" ? (
                  <>
                    {/* Quick Actions Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "var(--card-gap)",
                      padding: "0 10px"
                    }}>
                      {/* Loan Entry Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("entry")}
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          cursor: "pointer",
                          borderRadius: "24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "20px"
                        }}
                      >
                        <div style={iconContainerStyle("#6366f1")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>New Loan Entry</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Start a new customer loan application with ease.</p>
                        </div>
                      </div>

                      {/* Loan Retrieve Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("retrieve")}
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          cursor: "pointer",
                          borderRadius: "24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "20px"
                        }}
                      >
                        <div style={iconContainerStyle("#22d3ee")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Loan Retrieval</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Search and manage existing loan records instantly.</p>
                        </div>
                      </div>

                      {/* Loan Repayment Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("repayment")}
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          cursor: "pointer",
                          borderRadius: "24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "20px"
                        }}
                      >
                        <div style={iconContainerStyle("#10b981")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Loan Repayment</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Process customer payments and clear loans.</p>
                        </div>
                      </div>

                      {/* Loan Manage Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("manage")}
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          cursor: "pointer",
                          borderRadius: "24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "20px"
                        }}
                      >
                        <div style={iconContainerStyle("#f59e0b")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Edit / Delete</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Modify existing records or delete canceled loans.</p>
                        </div>
                      </div>

                      {/* Closed Loans Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("closed")}
                        style={cardStyle}
                      >
                        <div style={iconContainerStyle("#8b5cf6")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Closed Loans</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>View history of successfully paid and closed accounts.</p>
                        </div>
                      </div>

                      {/* Business Analytics Card */}
                      <div
                        className="glass-card"
                        onClick={() => setPage("analytics")}
                        style={cardStyle}
                      >
                        <div style={iconContainerStyle("#10b981")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Business Analytics</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>View profit charts and loan statistics.</p>
                        </div>
                      </div>
                    </div>

                    {/* 📜 Recent Transactions Section (ADMIN ONLY) */}
                    {userRole === "admin" && (
                      <div style={{ marginTop: "60px", padding: "0 20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                          <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#111827" }}>Recent Activity</h3>
                          <button
                            onClick={() => setPage("transactions")}
                            style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: "700", cursor: "pointer", fontSize: "16px" }}
                          >
                            View All History →
                          </button>
                        </div>
                        <div className="glass-card" style={{ padding: "20px", borderRadius: "24px", border: "1.5px solid #000" }}>
                          {recentTransactions.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                              {recentTransactions.map((t, i) => (
                                <div key={t.tid || i} style={{
                                  display: "flex", justifyContent: "space-between", alignItems: "center",
                                  padding: "15px", borderRadius: "15px", background: "rgba(0,0,0,0.02)",
                                  border: "1px solid rgba(0,0,0,0.05)"
                                }}>
                                  <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <div style={{
                                      width: "45px", height: "45px", borderRadius: "12px",
                                      background: t.amount < 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                                      display: "flex", justifyContent: "center", alignItems: "center",
                                      color: t.amount < 0 ? "#ef4444" : "#10b981", border: "1px solid currentColor"
                                    }}>
                                      {t.amount < 0 ? "↓" : "↑"}
                                    </div>
                                    <div>
                                      <div style={{ fontWeight: "800", color: "#000" }}>{t.name}</div>
                                      <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{t.date} &bull; {t.type}</div>
                                    </div>
                                  </div>
                                  <div style={{ fontWeight: "800", color: t.amount < 0 ? "#ef4444" : "#10b981", fontSize: "16px" }}>
                                    {t.amount < 0 ? "-" : "+"} ₹{Math.abs(t.amount).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No recent transactions found.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <UserDashboard 
                    userPhone={userPhone} 
                    setSelectedLoan={setSelectedLoan} 
                    setPage={setPage} 
                  />
                )}

              </div>
            )}

            {page === "entry" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    marginBottom: "20px",
                    padding: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <LoanEntry />
              </div>
            )}

            {page === "retrieve" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    marginBottom: "20px",
                    padding: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <LoanRetrieve />
              </div>
            )}

            {page === "repayment" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <LoanRepayment />
              </div>
            )}

            {page === "manage" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <LoanManage />
              </div>
            )}

            {page === "closed" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <ClosedLoans />
              </div>
            )}

            {page === "analytics" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <Analytics setPage={setPage} />
              </div>
            )}

            {page === "transactions" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <Transactions setPage={setPage} />
              </div>
            )}

            {page === "expiring" && (
              <div className="fade-in">
                <button
                  onClick={() => setPage("home")}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "none", color: "var(--text-muted)", marginBottom: "20px", padding: "10px", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Dashboard
                </button>
                <ExpiringLoans userRole={userRole} userPhone={userPhone} />
              </div>
            )}

            {page === "loan-statement" && (
              <div className="fade-in">
                <LoanStatement loan={selectedLoan} setPage={setPage} />
              </div>
            )}

          </>
        )}
      </main>

      {/* 🔐 Login Popup */}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
          setUserPhone={setUserPhone}
        />
      )}
      <Footer />
    </div>
  );
}

const cardStyle = {
  padding: "40px",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px"
};

const iconContainerStyle = (color) => ({
  width: "60px",
  height: "60px",
  borderRadius: "18px",
  background: `${color}20`,
  color: color,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: `0 8px 16px -4px ${color}40`,
});

export default App;