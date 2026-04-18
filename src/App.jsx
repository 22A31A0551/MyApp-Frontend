import { useState, useEffect } from "react";
import Navbar from "./Navbar";

import LoanEntry from "./LoanEntry";
import LoanRetrieve from "./LoanRetrieve";
import LoanRepayment from "./LoanRepayment";
import LoanManage from "./LoanManage";
import ClosedLoans from "./ClosedLoans";
import Login from "./Login";
import Landing from "./Landing";
import ExpiringLoans from "./ExpiringLoans";
import Analytics from "./Analytics";
import Transactions from "./Transactions";
import Footer from "./Footer";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });
  const [page, setPage] = useState("home");
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/loans");
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
          setRecentTransactions(list.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoggedIn && userRole === "admin") fetchRecent();
  }, [isLoggedIn, userRole, page]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      localStorage.removeItem("userRole");
      setUserRole(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userRole) localStorage.setItem("userRole", userRole);
  }, [userRole]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column" }}>
      <Navbar
        setShowLogin={setShowLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole}
        setPage={setPage}
      />

      <main style={{ paddingTop: "120px", paddingBottom: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {!isLoggedIn ? (
          <Landing />
        ) : (
          <>
            {page === "home" && (
              <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                
                {/* Hero Section */}
                <section style={{ textAlign: "center", marginBottom: "60px" }}>
                  <h1 style={{ 
                    fontSize: "48px", 
                    fontWeight: "800", 
                    marginBottom: "16px",
                    color: "#111827",
                    letterSpacing: "-0.5px"
                  }}>
                    {userRole === "admin" ? "Srinu Bankers" : "User Portal"}
                  </h1>
                  <p style={{ color: "#000000", fontSize: "18px", fontWeight: "500", maxWidth: "600px", margin: "0 auto" }}>
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
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "25px",
                      padding: "0 20px"
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
                        <div style={iconContainerStyle("#8b5cf6")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Closed Loans</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>View history of successfully paid and closed accounts.</p>
                        </div>
                      </div>

                      {/* Analytics Card */}
                      <div 
                        className="glass-card"
                        onClick={() => setPage("analytics")}
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
                        <div style={iconContainerStyle("#f43f5e")}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Business Analytics</h3>
                          <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Track portfolio growth and financial health.</p>
                        </div>
                      </div>

                    </div>

                    {/* Recent Activity Section (Visual Only) */}
                    <div className="glass" style={{ margin: "60px 20px", padding: "30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "20px" }}>Recent Transactions</h3>
                        <button 
                          onClick={() => setPage("transactions")}
                          style={{ background: "transparent", border: "none", color: "#6366f1", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
                        >
                          View All
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {recentTransactions.length > 0 ? recentTransactions.map((t) => (
                          <div key={t.tid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,0,0,0.05)" }}>
                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                              <div style={{ 
                                width: "40px", height: "40px", borderRadius: "10px", 
                                background: t.amount < 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)", 
                                display: "flex", justifyContent: "center", alignItems: "center", 
                                color: t.amount < 0 ? "#ef4444" : "#10b981" 
                              }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  {t.amount < 0 ? <line x1="12" y1="19" x2="12" y2="5"></line> : <line x1="12" y1="5" x2="12" y2="19"></line>}
                                  {t.amount < 0 ? <polyline points="5 12 12 5 19 12"></polyline> : <polyline points="19 12 12 19 5 12"></polyline>}
                                </svg>
                              </div>
                              <div>
                                <div style={{ fontWeight: "700", color: "#000" }}>{t.name}</div>
                                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{t.date} • {t.time}</div>
                              </div>
                            </div>
                            <div style={{ fontWeight: "800", color: t.amount < 0 ? "#ef4444" : "#10b981", fontSize: "16px" }}>
                              {t.amount < 0 ? "-" : "+"} ₹{Math.abs(t.amount).toLocaleString()}
                            </div>
                          </div>
                        )) : (
                          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>No recent transactions.</div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div 
                    className="glass-card" 
                    style={{ 
                      padding: "60px 20px", 
                      textAlign: "center", 
                      borderRadius: "24px", 
                      margin: "40px 20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ ...iconContainerStyle("#10b981"), margin: "0 auto 20px" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>User Dashboard Coming Soon</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
                      We are creating a dedicated space for you to view your loans and process transactions. Please check back later.
                    </p>
                  </div>
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
                <ExpiringLoans />
              </div>
            )}

            {page === "analytics" && (
              <div className="fade-in">
                <Analytics setPage={setPage} />
              </div>
            )}

            {page === "transactions" && (
              <div className="fade-in">
                <Transactions setPage={setPage} />
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
        />
      )}

      <Footer />
    </div>
  );
}

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