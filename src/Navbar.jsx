import profileicon from "./assets/profileicon.webp";
import { useState, useEffect } from "react";

function Navbar({ setShowLogin, isLoggedIn, setIsLoggedIn }) {
  const [showMenu, setShowMenu] = useState(false);

  // ✅ Auto close dropdown after 5 sec
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
    <div
      style={{
        backgroundColor: "#000000",
        color: "white",
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        borderRadius: "12px 12px 0 0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT */}
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Hi, Admin 👋
        </span>
      </div>

      {/* CENTER */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search customers..."
            style={{
              width: "300px",
              padding: "8px 12px 8px 35px",
              borderRadius: "8px",
              border: "1px solid #444",
              outline: "none",
              backgroundColor: "white",
              color: "black",
            }}
          />

          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "8px",
              color: "#aaa",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Dashboard */}
        <button style={btnStyle}>Dashboard</button>

        {/* Login */}
        <button
          onClick={() => setShowLogin(true)}
          style={btnStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          {isLoggedIn ? "Logged In" : "Login"}
        </button>

        {/* Notification */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            fontSize: "18px",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.2)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-8px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "10px",
              padding: "2px 5px",
            }}
          >
            3
          </span>
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          
          {/* Icon */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              border: "2px solid white",
              cursor: "pointer",
            }}
          >
            <img
              src={profileicon}
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Dropdown */}
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "white",
                borderRadius: "8px",
                width: "130px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                padding: "5px 0",
              }}
            >
              {/* Settings */}
              <div
                style={menuItem}
                onClick={() => alert("Settings clicked")}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "black";
                }}
              >
                ⚙️ Settings
              </div>

              {/* Logout */}
              <div
                style={menuItem}
                onClick={() => {
                  setIsLoggedIn(false);
                  setShowMenu(false);
                  setShowLogin(false);
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "black";
                }}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid white",
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const menuItem = {
  padding: "10px",
  color: "black",
  cursor: "pointer",
};

export default Navbar;