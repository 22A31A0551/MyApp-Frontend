import { useState } from "react";
import { API_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from "./config";

function Login({ setShowLogin, setIsLoggedIn, setUserRole, setUserPhone }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleAction = async () => {
    if (mode === "login") {
      // Check admin credentials
      if (identifier === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setUserRole("admin");
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        // ✅ FIXED LOGIN API
        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: identifier, password }),
          });

          const data = await res.json();

          if (data && data.id) {
            setUserRole("user");
            setUserPhone(identifier);
            setIsLoggedIn(true);
            setShowLogin(false);
          } else {
            alert("Invalid credentials ❌");
          }
        } catch (error) {
          console.error("Login Error:", error);
          alert("Error connecting to the database.");
        }
      }
    } else if (mode === "register") {
      if (phone.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }
      if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
      }

      // ✅ FIXED REGISTER API
      try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });

        const message = await res.text();

        alert(message);

        setMode("login");
        setIdentifier(phone);
        setPassword("");
      } catch (error) {
        console.error("Registration Error:", error);
        alert("Error connecting to the database.");
      }
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="glass"
        style={{
          padding: "var(--card-gap)",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          backgroundColor: "#ffffff",
          margin: "10px"
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <div style={{
            background: "var(--primary)",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "800",
            margin: "0 auto 15px",
            color: "#fff",
            border: "1.5px solid #000"
          }}>S</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-main)" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "5px" }}>
            {mode === "login" ? "Sign in to your account" : "Register as a new user"}
          </p>
        </div>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          {mode === "login" ? (
            <>
              <label style={{ fontSize: "12px", color: "#000", marginBottom: "8px", display: "block", marginLeft: "4px", fontWeight: "600" }}>Phone Number</label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ width: "100%", marginBottom: "15px" }}
              />
            </>
          ) : (
            <>
              <label style={{ fontSize: "12px", color: "#000", marginBottom: "8px", display: "block", marginLeft: "4px", fontWeight: "600" }}>Phone Number</label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", marginBottom: "15px" }}
              />
            </>
          )}

          <label style={{ fontSize: "12px", color: "#000", marginBottom: "8px", display: "block", marginLeft: "4px", fontWeight: "600" }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />

          <div style={{ marginTop: "15px", textAlign: "center", fontSize: "13px" }}>
            {mode === "login" ? (
              <span style={{ color: "var(--text-muted)" }}>
                Don't have an account?{" "}
                <span onClick={() => { setMode("register"); setIdentifier(""); setPassword(""); }} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: "600" }}>
                  Register
                </span>
              </span>
            ) : (
              <span style={{ color: "var(--text-muted)" }}>
                Already have an account?{" "}
                <span onClick={() => { setMode("login"); setPhone(""); setPassword(""); }} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: "600" }}>
                  Login
                </span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAction}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "1.5px solid #000",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            marginBottom: "15px",
            cursor: "pointer",
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
          }}
          onMouseOver={(e) => { e.target.style.transform = "scale(1.02)"; }}
          onMouseOut={(e) => { e.target.style.transform = "scale(1)"; }}
        >
          {mode === "register" ? "Register" : "Sign In"}
        </button>

        <button
          onClick={() => setShowLogin(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "14px",
            padding: "8px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Login;