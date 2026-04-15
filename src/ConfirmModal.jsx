import React from "react";

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 9999
    }}>
      <div className="glass" style={{ width: "400px", padding: "30px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "15px", color: "white", fontSize: "20px" }}>{title}</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "25px", lineHeight: "1.5" }}>{message}</p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button onClick={onCancel} style={{
            padding: "10px 20px", background: "transparent", border: "1px solid var(--glass-border)",
            color: "var(--text-main)", borderRadius: "8px"
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "10px 20px", background: "var(--primary)", border: "none",
            color: "white", borderRadius: "8px", fontWeight: "600"
          }}>Confirm Action</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
