import { useState } from "react";

function Login({ setShowLogin, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      setIsLoggedIn(true);
      setShowLogin(false); // 👈 close popup
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "white", // overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          color: "black",
          border:"2px solid black"
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>

        <button
          onClick={() => setShowLogin(false)}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid black",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#8E44AD",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Login;