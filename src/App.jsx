import { useState } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import { useEffect } from "react";
import LoanEntry from "./LoanEntry";

function App() {
  
   const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
  
});
const [page, setPage] = useState("home");



useEffect(() => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
}, [isLoggedIn]);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn}
                 setIsLoggedIn={setIsLoggedIn}   />
                 <div
  style={{
    paddingTop: "80px",
    textAlign: "center",
    color: "white",
  }}
>
  {page === "home" && (

  <div
    style={{
      marginTop: "40px",
      display: "flex",
      justifyContent: "center",
      gap: "40px",
    }}
  >

    
    {/* Loan Entry */}
    <div
      style={cardStyle}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
      onClick={() => setPage("entry")}
    >
      ➕ Loan Entry
    </div>

    {/* Loan Retrieve */}
    <div
      style={cardStyle}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
      onClick={() => alert("Loan Retrieve Page")}
    >
      🔍 Loan Retrieve
    </div>
    
    
  </div>
  )}
{page === "entry" && <LoanEntry />}
    
  
</div>

      
       {/* 🔐 Login Popup */}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      
    </div>

    
  );

  
}
/* ✅ ADD THIS AT BOTTOM */
const cardStyle = {
  width: "260px",
  height: "140px",
  backgroundColor: "white",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  transition: "0.3s",
  color:"black",
};


export default App;