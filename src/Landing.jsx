import React from "react";

function Landing() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--bg-color)", 
      color: "var(--text-main)", 
      padding: "100px 20px 80px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Dynamic Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(79, 70, 229, 0.03) 0%, rgba(255, 255, 255, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "5%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.02) 0%, rgba(255, 255, 255, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }}></div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <section className="fade-in" style={{ textAlign: "center", marginBottom: "80px" }}>
          <div className="label-small" style={{ 
            display: "inline-block", 
            padding: "8px 16px", 
            borderRadius: "30px", 
            background: "var(--surface-low)", 
            color: "var(--primary)", 
            marginBottom: "24px",
            border: "1px solid var(--surface-high)"
          }}>
            Trusted Since 1995 • Professional Valuation
          </div>
          <h1 style={{ 
            fontSize: "clamp(40px, 8vw, 64px)", 
            fontWeight: "900", 
            marginBottom: "20px",
            color: "var(--text-main)",
            letterSpacing: "-1.5px",
            lineHeight: "1.1"
          }}>
            Unlock the Real Value of <br/>
            <span className="gold-text">Your Gold & Silver</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "19px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
            Experience secure, transparent, and immediate loan processing at **Sreenu Banker's**. We provide competitive valuations for your precious assets with zero hidden charges.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "40px" }}>
            <button className="btn-primary" style={{ padding: "16px 32px", fontSize: "16px" }}>
              Start Your Application
            </button>
            <button className="btn-secondary" style={{ padding: "16px 32px", fontSize: "16px" }}>
              View Rates
            </button>
          </div>
        </section>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "40px",
          marginTop: "60px"
        }}>
          {/* GOLD CARD */}
          <div className="glass-card fade-in" style={{
            padding: "40px", 
            background: "var(--surface-lowest)", 
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ fontSize: "50px", marginBottom: "24px" }}>🪙</div>
            <h2 style={{ fontSize: "28px", color: "var(--primary)", marginBottom: "16px", fontWeight: "800" }}>
              Gold Loans
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "30px", lineHeight: "1.7", fontSize: "15px" }}>
              Secure funding against your gold ornaments with instant verification and the industry's highest loan-to-value ratio.
            </p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "900" }}>✓</span>
                <span><strong>24K Gold:</strong> Pure Bullion & Coins</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "900" }}>✓</span>
                <span><strong>22K Gold:</strong> Standard Jewelry</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "900" }}>✓</span>
                <span><strong>18K Gold:</strong> Luxury Stone-set items</span>
              </li>
            </ul>
          </div>

          {/* SILVER CARD */}
          <div className="glass-card fade-in" style={{
            padding: "40px", 
            background: "var(--surface-lowest)", 
            position: "relative",
            overflow: "hidden",
            animationDelay: "0.2s"
          }}>
            <div style={{ fontSize: "50px", marginBottom: "24px" }}>🥈</div>
            <h2 style={{ fontSize: "28px", color: "var(--text-main)", marginBottom: "16px", fontWeight: "800" }}>
              Silver Loans
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "30px", lineHeight: "1.7", fontSize: "15px" }}>
              Hassle-free appraisals for your silver articles, from antique utensils to fine silver bullion and investment grade coins.
            </p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: "900" }}>✓</span>
                <span><strong>Fine Silver:</strong> 99.9% Purity</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: "900" }}>✓</span>
                <span><strong>Sterling Silver:</strong> 92.5% Purity</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--text-main)" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: "900" }}>✓</span>
                <span><strong>Coin Silver:</strong> 90% Antique Purity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Landing;
