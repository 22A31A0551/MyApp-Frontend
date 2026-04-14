import { useState } from "react";

function Login({ setShowLogin, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Invalid credentials ❌");
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
          padding: "40px",
          width: "380px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <div style={{
            background: "linear-gradient(45deg, var(--primary), var(--secondary))",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0 auto 15px"
          }}>S</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "5px" }}>Login to your admin account</p>
        </div>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", display: "block", marginLeft: "4px" }}>Email Address</label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "15px" }}
          />

          <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", display: "block", marginLeft: "4px" }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <button 
          onClick={handleLogin} 
          style={{ 
            width: "100%", 
            padding: "14px", 
            backgroundColor: "var(--primary)", 
            color: "white", 
            border: "none", 
            borderRadius: "10px", 
            fontSize: "16px", 
            fontWeight: "600",
            marginBottom: "15px",
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "var(--primary-hover)"}
          onMouseOut={(e) => e.target.style.backgroundColor = "var(--primary)"}
        >
          Sign In
        </button>

        <button
          onClick={() => setShowLogin(false)}
          style={{ 
            width: "100%", 
            background: "transparent", 
            border: "none", 
            color: "var(--text-muted)",
            fontSize: "14px",
            padding: "8px"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Login;