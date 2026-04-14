import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import LoanEntry from "./LoanEntry";
import LoanRetrieve from "./LoanRetrieve";
import Login from "./Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [page, setPage] = useState("home");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Navbar 
        setShowLogin={setShowLogin} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn} 
      />

      <main style={{ paddingTop: "120px", paddingBottom: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {page === "home" && (
          <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* Hero Section */}
            <section style={{ textAlign: "center", marginBottom: "60px" }}>
              <h1 style={{ 
                fontSize: "48px", 
                fontWeight: "700", 
                marginBottom: "16px",
                background: "linear-gradient(to right, #fff, var(--text-muted))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Financial Management <br/> Made Effortless
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
                Securely manage loans, track transactions, and stay on top of your finance business with our premium administrative dashboard.
              </p>
            </section>

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
                onClick={() => alert("Search functionality coming soon!")}
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

              {/* Analytics Card (Placeholder) */}
              <div 
                className="glass-card"
                style={{
                  padding: "40px",
                  textAlign: "center",
                  cursor: "default",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  opacity: 0.7
                }}
              >
                <div style={iconContainerStyle("#a855f7")}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>Analytics</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Detailed business insights and reporting tools.</p>
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
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Oct {10+i}, 2023 • 2:4{i} PM</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: "700", color: "#10b981" }}>+ ₹{i*5},000.00</div>
                  </div>
                ))}
              </div>
            </div>

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
      </main>

      {/* 🔐 Login Popup */}
      {showLogin && (
        <Login 
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
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