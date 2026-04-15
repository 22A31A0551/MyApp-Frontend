import profileicon from "./assets/profileicon.webp";

function Navbar() {

  return (
    <nav className="glass" style={{
      position: "fixed",
      top: "15px",
      left: "20px",
      right: "20px",
      height: "70px",
      display: "flex",
      alignItems: "center",
      padding: "0 25px",
      zIndex: 1000,
      justifyContent: "space-between",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    }}>
      {/* LEFT: Logo/Admin */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          background: "linear-gradient(45deg, var(--primary), var(--secondary))",
          width: "35px",
          height: "35px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "18px"
        }}>S</div>
        <span style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px", display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline-flex" }}>
            {"Hi, Admin".split("").map((char, index) => (
              <span 
                key={index} 
                style={{
                  opacity: 0,
                  animation: `letterPopFade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                  animationDelay: `${index * 0.08}s`
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span style={{
            opacity: 0, 
            animation: "letterPopFade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards", 
            animationDelay: "0.9s",
            marginLeft: "6px"
          }}>👋</span>
        </span>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", maxWidth: "400px", margin: "0 20px" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Search customers or loans..."
            style={{
              width: "100%",
              paddingLeft: "45px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
          <svg
            style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Notification */}
        <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            backgroundColor: "var(--accent)",
            color: "black",
            borderRadius: "50%",
            fontSize: "10px",
            width: "16px",
            height: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            border: "2px solid var(--bg-color)"
          }}>3</span>
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid var(--glass-border)",
              cursor: "pointer",
              transition: "var(--transition)",
              background: "var(--surface-color)"
            }}
          >
            <img src={profileicon} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;