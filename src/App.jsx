import { useState, useEffect } from "react";
import Navbar from "./Navbar";

import LoanEntry from "./LoanEntry";
import LoanRetrieve from "./LoanRetrieve";
import LoanRepayment from "./LoanRepayment";
import LoanManage from "./LoanManage";
import ClosedLoans from "./ClosedLoans";
import Login from "./Login";
import Landing from "./Landing";
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
                    {userRole === "admin" ? "Administrative Dashboard" : "User Portal"}
                  </h1>
                  <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
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
                          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>New Loan Entry</h3>
                          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Start a new customer loan application with ease.</p>
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
                          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Loan Retrieval</h3>
                          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Search and manage existing loan records instantly.</p>
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
                          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Loan Repayment</h3>
                          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Process customer payments and clear loans.</p>
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
                          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Edit / Delete</h3>
                          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Modify existing records or delete canceled loans.</p>
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
                          <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Closed Loans</h3>
                          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>View history of successfully paid and closed accounts.</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity Section (Visual Only) */}
                    <div className="glass" style={{ margin: "60px 20px", padding: "30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "20px" }}>Recent Transactions</h3>
                        <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: "600" }}>View All</button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {[1, 2, 3].map(i => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(99, 102, 241, 0.1)", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--primary)" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              </div>
                              <div>
                                <div style={{ fontWeight: "600" }}>Sample Transaction #{i}04{i}</div>
                                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Oct {10 + i}, 2023 • 2:4{i} PM</div>
                              </div>
                            </div>
                            <div style={{ fontWeight: "700", color: "#10b981" }}>+ ₹{i * 5},000.00</div>
                          </div>
                        ))}
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