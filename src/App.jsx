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
        setPage={setPage}
      />

      <main style={{ 
        paddingTop: "120px", 
        paddingBottom: "80px", 
        flex: 1,
        background: "var(--bg-color)" 
      }}>
        {/* Decorative Background Elements */}
        {isLoggedIn && (
          <>
            <div style={{
              position: "absolute",
              top: "120px",
              right: "0",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(79, 70, 229, 0.03) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0
            }}></div>
          </>
        )}

        {!isLoggedIn ? (
          <Landing />
        ) : (
          <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 20px" }}>
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

                {/* Hero Section */}
                <section style={{ textAlign: "center", marginBottom: "80px" }}>
                  <div className="label-small" style={{ 
                    display: "inline-block", 
                    padding: "6px 14px", 
                    borderRadius: "30px", 
                    background: "rgba(99, 102, 241, 0.08)", 
                    color: "var(--primary)", 
                    marginBottom: "25px",
                    border: "1px solid rgba(99, 102, 241, 0.1)"
                  }}>
                    {userRole === "admin" ? "Master Control Panel" : "Secure Account Access"}
                  </div>
                  <h1 style={{
                    fontSize: "clamp(36px, 6vw, 56px)",
                    fontWeight: "900",
                    marginBottom: "16px",
                    color: "var(--text-main)",
                    letterSpacing: "-2px",
                    lineHeight: 1.1
                  }}>
                    {userRole === "admin" ? (
                      <>Welcome, <span className="gold-text">Manager</span></>
                    ) : (
                      <>Your <span className="gold-text">Gold Assets</span></>
                    )}
                  </h1>
                  <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "650px", margin: "0 auto", lineHeight: "1.7" }}>
                    {userRole === "admin"
                      ? "Seamlessly manage loans, track valuations, and oversee your secure gold financing empire from a single, high-performance interface."
                      : "Monitor your jewelry valuations, upcoming interests, and payment history with world-class security and transparency."}
                  </p>
                </section>

                {/* Conditional Display for Admin vs User */}
                {userRole === "admin" ? (
                  <>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "30px"
                    }}>
                      {[
                        { id: "entry", title: "Loan Acquisition", desc: "Initiate secure gold appraisal", color: "#6366f1", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> },
                        { id: "retrieve", title: "Master Directory", desc: "Search secure client archives", color: "#3b82f6", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> },
                        { id: "repayment", title: "Account Disposal", desc: "Process loan settlements", color: "#10b981", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> },
                        { id: "manage", title: "Inventory Control", desc: "Modify active loan parameters", color: "#8b5cf6", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> },
                        { id: "closed", title: "Historical Vault", desc: "View all settled accounts", color: "#f43f5e", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> }
                      ].map(action => (
                        <div
                          key={action.id}
                          className="glass-card"
                          onClick={() => setPage(action.id)}
                          style={{
                            padding: "45px 30px",
                            textAlign: "center",
                            cursor: "pointer",
                            background: "var(--surface-lowest)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "24px"
                          }}
                        >
                          <div style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "20px",
                            background: `${action.color}10`,
                            color: action.color,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: `1px solid ${action.color}20`
                          }}>
                            {action.icon}
                          </div>
                          <div>
                            <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "var(--text-main)", fontWeight: "800" }}>{action.title}</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: "500" }}>{action.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Statistics Section */}
                    <div style={{ 
                      marginTop: "50px", 
                      padding: "50px", 
                      borderRadius: "var(--radius-xl)", 
                      background: "var(--surface-low)", 
                      border: "1px solid var(--surface-high)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                        <div>
                          <h3 style={{ fontSize: "24px", fontWeight: "900", color: "var(--text-main)" }}>Live Performance Metrics</h3>
                          <p className="label-small" style={{ color: "var(--primary)", marginTop: "4px" }}>Secure Server Node • India/East</p>
                        </div>
                        <button className="btn-primary" style={{ padding: "12px 24px", fontSize: "14px" }}>Generate Monthly Audit</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                          <h4 className="label-small">Streamed Logs</h4>
                          {[
                            { id: "041", user: "K. Rajesh", item: "Gold Chain (24g)", amount: "+ ₹48,000", time: "Just Now", status: "VERIFIED" },
                            { id: "042", user: "M. Sravani", item: "Silver Utensils", amount: "+ ₹8,500", time: "14m ago", status: "VERIFIED" },
                            { id: "043", user: "P. Vinay", item: "Gold Coins (5g)", amount: "+ ₹12,000", time: "2h ago", status: "VERIFIED" }
                          ].map(txn => (
                            <div key={txn.id} style={{ 
                              display: "flex", 
                              justifyContent: "space-between", 
                              alignItems: "center", 
                              padding: "20px 25px", 
                              borderRadius: "var(--radius-md)", 
                              background: "var(--surface-lowest)",
                              border: "1px solid var(--surface-high)"
                            }}>
                              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                <div style={{ 
                                  width: "10px", height: "10px", borderRadius: "50%", background: "var(--primary)",
                                  boxShadow: `0 0 10px rgba(99, 102, 241, 0.2)`
                                }}></div>
                                <div>
                                  <div style={{ fontWeight: "700", color: "var(--text-main)", fontSize: "16px" }}>{txn.user}</div>
                                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{txn.item} • {txn.time}</div>
                                </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: "800", color: "#10b981", fontSize: "18px" }}>{txn.amount}</div>
                                <div style={{ fontSize: "11px", color: "#10b981", fontWeight: "800", marginTop: "2px", opacity: 0.8 }}>{txn.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ 
                          background: "var(--surface-lowest)",
                          borderRadius: "var(--radius-xl)",
                          padding: "35px",
                          border: "1px solid var(--surface-high)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center"
                        }}>
                          <div className="label-small" style={{ marginBottom: "15px" }}>Current Liquidity</div>
                          <div style={{ fontSize: "42px", fontWeight: "900", color: "var(--text-main)", letterSpacing: "-2px" }}>₹1.42 Cr</div>
                          <div style={{ color: "#10b981", fontSize: "14px", fontWeight: "700", marginTop: "5px" }}>↑ 12.4% from last audit</div>
                          <div style={{ marginTop: "30px", height: "6px", background: "var(--surface-high)", borderRadius: "3px" }}>
                            <div style={{ width: "75%", height: "100%", background: "var(--primary)", borderRadius: "3px" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* User Portfolio View */
                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                      <div className="glass-card" style={{ padding: "40px" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)", marginBottom: "30px" }}>Active Loan Portfolio</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                          {[
                            { id: "L-1024", item: "Gold Ornament (22K)", weight: "18.5g", principal: "₹45,000", nextInterest: "₹900", dueIn: "12 days" },
                            { id: "L-1025", item: "Silver Bricks", weight: "500g", principal: "₹28,000", nextInterest: "₹560", dueIn: "24 days" }
                          ].map(loan => (
                            <div key={loan.id} style={{ 
                              padding: "25px", borderRadius: "16px", background: "var(--surface-low)", border: "1px solid var(--surface-high)",
                              display: "flex", justifyContent: "space-between", alignItems: "center"
                            }}>
                              <div>
                                <div className="label-small" style={{ color: "var(--primary)", marginBottom: "4px" }}>CONTRACT #{loan.id}</div>
                                <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)" }}>{loan.item}</div>
                                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>Asset Weight: {loan.weight}</div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "20px", fontWeight: "900", color: "var(--text-main)" }}>{loan.principal}</div>
                                <div style={{ fontSize: "13px", color: "#10b981", fontWeight: "700" }}>Int: {loan.nextInterest}</div>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Due in {loan.dueIn}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                      <div style={{ 
                        padding: "40px", borderRadius: "var(--radius-xl)", 
                        background: "var(--surface-low)", 
                        border: "1px solid var(--surface-high)",
                        textAlign: "center"
                      }}>
                        <div className="label-small" style={{ color: "var(--primary)", marginBottom: "15px" }}>Customer Identity</div>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--primary)", margin: "0 auto 20px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "32px", fontWeight: "900", color: "#fff" }}>P</div>
                        <h4 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-main)" }}>Praneeth Kumar</h4>
                        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "5px" }}>Verified Client since Sep 2024</p>
                        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          <div style={{ padding: "15px", background: "var(--surface-lowest)", border: "1px solid var(--surface-high)", borderRadius: "16px" }}>
                            <div className="label-small" style={{ fontSize: "10px" }}>TOTAL ASSETS</div>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", marginTop: "4px" }}>₹73k</div>
                          </div>
                          <div style={{ padding: "15px", background: "var(--surface-lowest)", border: "1px solid var(--surface-high)", borderRadius: "16px" }}>
                            <div className="label-small" style={{ fontSize: "10px" }}>CREDIT SCORE</div>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "#10b981", marginTop: "4px" }}>92/100</div>
                          </div>
                        </div>
                      </div>
                      <div className="glass-card" style={{ padding: "30px", textAlign: "center" }}>
                        <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.5" }}>Need assistance? Connect with your financial advisor.</p>
                        <button className="btn-primary" style={{ width: "100%", marginTop: "15px", padding: "14px" }}>Start Live Chat</button>
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Closed Loans</h3>
                      <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>View history of successfully paid and closed accounts.</p>
                    </div>
                  </div>

                  {/* Expiring Loans Card */}
                  <div 
                    className="glass-card"
                    onClick={() => setPage("expiring")}
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
                    <div style={iconContainerStyle("#ef4444")}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "22px", marginBottom: "8px", color: "#000" }}>Expiring Loans</h3>
                      <p style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}>Remind customers with loans ending soon.</p>
                    </div>
                    <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>User Dashboard Coming Soon</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
                      We are creating a dedicated space for you to view your loans and process transactions. Please check back later.
                    </p>
                  </div>
                )}

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
                            <div style={{ fontWeight: "700", color: "#000" }}>Sample Transaction #{i}04{i}</div>
                            <div style={{ fontSize: "12px", color: "#000", fontWeight: "600" }}>Oct {10+i}, 2023 • 2:4{i} PM</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: "700", color: "#10b981" }}>+ ₹{i*5},000.00</div>
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

            {page === "entry" && (
              <div className="fade-in">
                <button onClick={() => setPage("home")} style={backButtonStyle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Control Center</button>
                <LoanEntry />
              </div>
            )}

            {page === "retrieve" && (
              <div className="fade-in">
                <button onClick={() => setPage("home")} style={backButtonStyle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Control Center</button>
                <LoanRetrieve />
              </div>
            )}

            {page === "repayment" && (
              <div className="fade-in">
                <button onClick={() => setPage("home")} style={backButtonStyle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Control Center</button>
                <LoanRepayment />
              </div>
            )}

            {page === "manage" && (
              <div className="fade-in">
                <button onClick={() => setPage("home")} style={backButtonStyle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Control Center</button>
                <LoanManage />
              </div>
            )}

            {page === "closed" && (
              <div className="fade-in">
                <button onClick={() => setPage("home")} style={backButtonStyle}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Control Center</button>
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
          </>
        )}
      </main>


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

const backButtonStyle = {
  display: "flex", alignItems: "center", gap: "10px", background: "var(--surface-lowest)", border: "1px solid var(--surface-high)", color: "var(--text-muted)",
  marginBottom: "30px", padding: "10px 20px", borderRadius: "12px", cursor: "pointer", fontSize: "13px", fontWeight: "700", marginLeft: "auto", marginRight: "auto",
  boxShadow: "var(--shadow-sm)", transition: "var(--transition)"
};

export default App;