import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: "auto",
      padding: "50px 20px 30px",
      background: "#0a192f",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "#f8fafc",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: "absolute",
        top: "-150px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }}></div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", position: "relative", zIndex: 1 }}>
        
        {/* Left Side: Brand & Caption */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h3 style={{ 
            fontSize: "24px", 
            margin: 0, 
            fontWeight: "900", 
            color: "#fff",
            letterSpacing: "-1px"
          }}>
            Sreenu Banker's
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.7", margin: 0, fontWeight: "500" }}>
            The gold standard in secure financing. Leveraging deep expertise and cutting-edge valuation precision since 1998.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            {[
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>,
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>
            ].map((icon, idx) => (
              <div key={idx} className="social-icon" style={{...socialIconStyle, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)"}}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Middle part: Important Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h4 style={{ fontSize: "15px", margin: 0, fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>Market Insights</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="https://www.kitco.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <span style={iconBoxStyle("#6366f1")}>📈</span> 
              <span>Global Spot Market</span>
            </a>
            <a href="https://goldprice.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <span style={iconBoxStyle("#10b981")}>💰</span> 
              <span>Live Appraisal Rates</span>
            </a>
            <a href="https://www.gold.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <span style={iconBoxStyle("#8b5cf6")}>🌍</span> 
              <span>World Gold Council</span>
            </a>
          </div>
        </div>

        {/* Right side: Newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h4 style={{ fontSize: "15px", margin: 0, fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>Intelligence Digest</h4>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0, fontWeight: "500" }}>Subscribe for exclusive market analysis and asset protection tips.</p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
            <input 
              type="email" 
              placeholder="Analysis destination (email)" 
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                outline: "none",
                fontSize: "14px",
                flex: 1,
                fontWeight: "600"
              }}
            />
            <button 
              type="submit"
              className="btn-primary"
              style={{
                padding: "0 20px",
                height: "46px",
                fontSize: "14px"
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

      </div>
      
      {/* Bottom Copyright */}
      <div style={{ 
        maxWidth: "1200px", 
        margin: "40px auto 0", 
        fontSize: "13px", 
        color: "rgba(255,255,255,0.5)", 
        borderTop: "1px solid rgba(255,255,255,0.1)", 
        paddingTop: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "600",
        position: "relative",
        zIndex: 1
      }}>
        <span>© {new Date().getFullYear()} Sreenu Banker's Ledger • Secured Node</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <span style={{ cursor: "pointer", opacity: 0.8 }}>Privacy Protocol</span>
          <span style={{ cursor: "pointer", opacity: 0.8 }}>Asset Terms</span>
        </div>
      </div>
    </footer>
  );
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  color: "rgba(255,255,255,0.6)",
  transition: "var(--transition)",
  fontWeight: "600",
  fontSize: "14px"
};

const iconBoxStyle = (bgColor) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  background: `${bgColor}10`,
  color: bgColor,
  fontSize: "15px"
});

const socialIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  background: "var(--surface-low)",
  color: "var(--text-muted)",
  cursor: "pointer",
  transition: "var(--transition)",
  border: "1px solid var(--surface-high)"
};

export default Footer;

