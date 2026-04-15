import React from 'react';

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--glass-border)",
      background: "rgba(5, 6, 15, 0.4)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      color: "var(--text-muted)",
      padding: "25px 20px",
      marginTop: "auto"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: "20px" 
      }}>
        
        {/* Brand Info */}
        <div style={{ textAlign: "left" }}>
          <h3 style={{ 
            color: "var(--text-main)", 
            fontSize: "16px", 
            marginBottom: "5px", 
            fontWeight: "600",
            letterSpacing: "0.5px"
          }}>
            Suvarna Finance
          </h3>
          <p style={{ fontSize: "13px", opacity: 0.7 }}>Secure Gold Loan Management System</p>
        </div>

        {/* Legal & Internal Warning */}
        <div style={{ fontSize: "13px", textAlign: "right" }}>
          <p style={{ color: "#eab308", marginBottom: "5px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
            <span>⚠️</span> Strictly for Authorized Internal Admin Use
          </p>
          <p style={{ opacity: 0.6 }}>&copy; {new Date().getFullYear()} Suvarna Finance. All Rights Reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
