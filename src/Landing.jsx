import React from "react";

function Landing() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <section className="fade-in" style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ 
          fontSize: "48px", 
          fontWeight: "800", 
          marginBottom: "16px",
          color: "#111827",
          letterSpacing: "-0.5px"
        }}>
          Premium Loan Processing <br/> Gold & Silver
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          Explore our offerings and details about the accepted quality items for your financial needs. Log in or register to securely access your portal.
        </p>
      </section>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "40px",
        padding: "0 20px"
      }}>
        {/* GOLD CARD */}
        <div className="glass-card fade-in" style={{
          padding: "40px", borderRadius: "24px", background: "linear-gradient(145deg, #fffbeb, #fef3c7)", border: "1px solid #fde68a",
          boxShadow: "0 20px 40px -15px rgba(251, 191, 36, 0.3)"
        }}>
          <h2 style={{ fontSize: "28px", color: "#b45309", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "32px" }}>🪙</span> Gold Items
          </h2>
          <p style={{ color: "#78350f", marginBottom: "20px", lineHeight: "1.6" }}>
            We accept high-quality gold ornaments and bullion for secure loans with maximum valuation and immediate processing.
          </p>
          <ul style={{ color: "#92400e", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f59e0b", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>24K Gold:</strong> 99.9% Purity (Coins, Bars)
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f59e0b", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>22K Gold:</strong> 91.6% Purity (Standard Jewelry)
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f59e0b", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>18K Gold:</strong> 75.0% Purity (Stone-studded Items)
            </li>
          </ul>
        </div>

        {/* SILVER CARD */}
        <div className="glass-card fade-in" style={{
          padding: "40px", borderRadius: "24px", background: "linear-gradient(145deg, #f8fafc, #f1f5f9)", border: "1px solid #e2e8f0",
          boxShadow: "0 20px 40px -15px rgba(148, 163, 184, 0.3)", animationDelay: "0.2s"
        }}>
          <h2 style={{ fontSize: "28px", color: "#334155", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "32px" }}>🥈</span> Silver Items
          </h2>
          <p style={{ color: "#475569", marginBottom: "20px", lineHeight: "1.6" }}>
            We provide trustworthy appraisals for fine and standard silver items ensuring you get the best value.
          </p>
          <ul style={{ color: "#334155", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#94a3b8", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>Fine Silver:</strong> 99.9% Purity (Coins & Bars)
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#94a3b8", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>Sterling Silver:</strong> 92.5% Purity (Jewelry & Utensils)
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#94a3b8", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>✓</div>
              <strong>Coin Silver:</strong> 90.0% Purity (Antique Items)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Landing;
