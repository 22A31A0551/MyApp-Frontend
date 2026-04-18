import profileicon from "./assets/profileicon.webp";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "70px",
      display: "flex",
      alignItems: "center",
      padding: "0 30px",
      zIndex: 1000,
      justifyContent: "space-between",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      backgroundColor: "var(--nav-bg)",
      color: "var(--nav-text)",
      borderBottom: "1px solid var(--nav-border)",
      boxSizing: "border-box"
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
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              color: "var(--input-text)",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
            }}
          />
          <svg
            style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--icon-color)" }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Dark Mode Toggle */}
        <div 
          onClick={toggleTheme}
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "var(--nav-text)",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            transition: "var(--transition)"
          }}
        >
          {theme === "dark" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </div>

        {/* Notification */}
        <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--nav-text)" }}>
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
            border: "2px solid var(--nav-bg)"
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