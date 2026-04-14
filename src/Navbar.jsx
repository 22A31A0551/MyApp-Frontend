import profileicon from "./assets/profileicon.webp";
import { useState, useEffect } from "react";

function Navbar({ setShowLogin, isLoggedIn, setIsLoggedIn }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let timer;
    if (showMenu) {
      timer = setTimeout(() => {
        setShowMenu(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showMenu]);

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
        <span style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px" }}>
          Hi, Admin <span style={{opacity: 0.8}}>👋</span>
        </span>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", maxWidth: "400px" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Search transactions..."
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
        <button 
          onClick={() => setShowLogin(true)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid var(--glass-border)",
            background: isLoggedIn ? "var(--glass-bg)" : "var(--primary)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>

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
            onClick={() => setShowMenu(!showMenu)}
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

          {showMenu && (
            <div className="glass" style={{
              position: "absolute",
              top: "55px",
              right: "0",
              width: "180px",
              padding: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              animation: "fadeIn 0.2s ease-out"
            }}>
              <div style={menuItemStyle} onClick={() => alert("Settings clicked")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "10px"}}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </div>
              <div style={{...menuItemStyle, color: "#ff4757"}} onClick={() => { setIsLoggedIn(false); setShowMenu(false); setShowLogin(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "10px"}}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const menuItemStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  transition: "var(--transition)",
  color: "var(--text-main)",
  "&:hover": {
    background: "rgba(255,255,255,0.05)"
  }
};

export default Navbar;