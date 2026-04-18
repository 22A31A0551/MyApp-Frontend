import { useState } from "react";

function Login({ setShowLogin, setIsLoggedIn, setUserRole }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleAction = async () => {
    if (mode === "login") {
      // Check admin credentials
      if (identifier === "admin@gmail.com" && password === "1234") {
        setUserRole("admin");
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        // ✅ FIXED LOGIN API
        try {
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: identifier, password }),
          });

          const data = await res.json();

          if (data && data.id) {
            setUserRole("user");
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
        const res = await fetch("http://localhost:8080/api/auth/register", {
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
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: "50px 40px",
          width: "440px",
          textAlign: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <div style={{ marginBottom: "35px" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            width: "64px",
            height: "64px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "800",
            margin: "0 auto 24px",
            color: "#fff",
            boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)"
          }}>S</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-main)" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "8px", fontWeight: "500" }}>
            {mode === "login" ? "Secure access to your gold loan dashboard" : "Register to start your financial journey"}
          </p>
        </div>

        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          {mode === "login" ? (
            <>
              <label style={{ fontSize: "12px", color: "#000", marginBottom: "8px", display: "block", marginLeft: "4px", fontWeight: "600" }}>Phone Number</label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ width: "100%", marginBottom: "20px" }}
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
                style={{ width: "100%", marginBottom: "20px" }}
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

          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "14px" }}>
            {mode === "login" ? (
              <span style={{ color: "var(--text-muted)" }}>
                Don't have an account?{" "}
                <span onClick={() => { setMode("register"); setIdentifier(""); setPassword(""); }} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: "700" }}>
                  Register
                </span>
              </span>
            ) : (
              <span style={{ color: "var(--text-muted)" }}>
                Already have an account?{" "}
                <span onClick={() => { setMode("login"); setPhone(""); setPassword(""); }} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: "700" }}>
                  Login
                </span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAction}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        >
          {mode === "register" ? "Create Secure Account" : "Access Portal"}
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
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Cancel
        </button>
      </div>
    </div>

  );
}

export default Login;