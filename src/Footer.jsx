import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: "auto",
      padding: "40px 20px",
      background: "#050505",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      color: "#ffffff"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h4 style={{ color: "#ffffff", fontSize: "18px", margin: 0, fontWeight: "600" }}>Market Resources & Predictions</h4>
        <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, maxWidth: "600px", alignSelf: "center" }}>
          Stay updated with the latest gold market prices, trends, and future predictions from top financial resources.
        </p>
        
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: "15px",
          marginTop: "10px"
        }}>
          <a href="https://www.kitco.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            <span style={iconColor("#f59e0b")}>📈</span> Kitco (Market News & Live Charts)
          </a>
          <a href="https://goldprice.org" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            <span style={iconColor("#10b981")}>💰</span> GoldPrice.org (Live Rates)
          </a>
          <a href="https://www.gold.org" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            <span style={iconColor("#6366f1")}>🌍</span> World Gold Council (Predictions & Reports)
          </a>
        </div>
        
        <div style={{ marginTop: "20px", fontSize: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "20px" }}>
          © {new Date().getFullYear()} Gold Loan Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
  color: "#ffffff",
  background: "rgba(255, 255, 255, 0.08)",
  padding: "10px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  transition: "all 0.3s ease",
  fontWeight: "500",
  fontSize: "14px"
};

const iconColor = (color) => ({
  color: color,
  fontSize: "16px"
});

export default Footer;
