import profileicon from "./assets/profileicon.webp";
import { useState, useEffect, useRef } from "react";
import { API_URL } from "./config";

function Navbar({ setShowLogin, isLoggedIn, setIsLoggedIn, setUserRole, userRole, userPhone, setPage, setSelectedLoan }) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [expiringLoans, setExpiringLoans] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setExpiringLoans([]);
      return;
    }

    const fetchExpiringLoans = () => {
      fetch(`${API_URL}/api/loans/expiring`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            if (userRole === "admin") {
              setExpiringLoans(data);
            } else {
              // Filter by phone for specific user - ensuring trimmed string comparison
              const trimmedUserPhone = String(userPhone || "").trim();
              const myExpiring = data.filter(loan =>
                String(loan.phone || "").trim() === trimmedUserPhone
              );
              setExpiringLoans(myExpiring);
            }
          }
        })
        .catch(err => console.error(err));
    };

    fetchExpiringLoans();
    const interval = setInterval(fetchExpiringLoans, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);


  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== "") {
        setIsSearching(true);
        try {
          const res = await fetch(`${API_URL}/api/loans/search?name=${searchQuery}`);
          if (res.ok) {
            const result = await res.json();
            setSearchResults(Array.isArray(result) ? result : []);
          } else {
            setSearchResults([]);
          }
          setShowSearchDropdown(true);
        } catch (error) {
          console.error(error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      padding: "0 15px",
      zIndex: 1000,
      justifyContent: "space-between",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      backgroundColor: "#311b5e",
      color: "#ffffff",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      boxSizing: "border-box",
      gap: "10px"
    }}>
      {/* LEFT: Logo/Admin */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", minWidth: "50px" }}>
        <div style={{
          background: "var(--primary)",
          width: "30px",
          height: "30px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "16px",
          border: "1px solid #000"
        }}>S</div>
        <span className="hide-mobile" style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
          Hi, {isLoggedIn ? (userRole === "admin" ? "Admin" : "User") : "Guest"}
        </span>
      </div>

      {/* CENTER: Search */}
      <div style={{ flex: 2, display: "flex", justifyContent: "center", maxWidth: "500px" }}>
        {isLoggedIn && userRole === "admin" && (
          <div ref={searchRef} style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search active loans..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => {
                if (searchQuery.trim() !== "") setShowSearchDropdown(true);
              }}
              style={{
                width: "100%",
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingLeft: "32px",
                paddingRight: "10px",
                background: "#ffffff",
                border: "1.5px solid #000",
                borderRadius: "8px",
                color: "#0f172a",
                fontSize: "13px",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
              }}
            />
            <svg
              style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            {/* Search Dropdown */}
            {showSearchDropdown && searchQuery.trim() !== "" && (
              <div className="glass" style={{
                position: window.innerWidth < 600 ? "fixed" : "absolute",
                top: window.innerWidth < 600 ? "70px" : "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(95vw, 500px)",
                marginTop: window.innerWidth < 600 ? "0" : "12px",
                maxHeight: "70vh",
                overflowY: "auto",
                borderRadius: "20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                padding: "15px",
                zIndex: 2000,
                background: "#ffffff",
                border: "2px solid #000",
                animation: "fadeIn 0.2s ease-out",
                color: "#1e293b"
              }}>
                {isSearching ? (
                  <div style={{ padding: "10px", textAlign: "center", color: "#000000", fontSize: "14px" }}>Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div style={{ padding: "8px 10px", fontSize: "12px", color: "#000000", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Active Loans for "{searchQuery}"
                    </div>
                    {searchResults.map((loan, idx) => (
                      <div key={loan._id || loan.id || idx} style={{
                        padding: "14px",
                        borderBottom: idx < searchResults.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        background: "white",
                        borderRadius: "10px",
                        marginBottom: idx < searchResults.length - 1 ? "8px" : "0",
                        transition: "all 0.2s",
                        cursor: "pointer",
                        border: "1px solid transparent"
                      }}
                      onMouseOver={(e) => { 
                        e.currentTarget.style.background = "#f1f5f9";
                        e.currentTarget.style.borderColor = "var(--primary)";
                      }}
                      onMouseOut={(e) => { 
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                      onClick={() => {
                        if (setSelectedLoan) setSelectedLoan(loan);
                        setPage("loan-statement");
                        setSearchQuery("");
                        setShowSearchDropdown(false);
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ fontWeight: "700", color: "#000000", fontSize: "15px", lineHeight: "1.3" }}>{loan.name}</span>
                          <span style={{ color: "#10b981", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>₹{loan.amount}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", fontSize: "12px", color: "#64748b", gap: "4px" }}>
                          <span>Item: {loan.item}</span>
                          <span style={{ fontWeight: "600" }}>Phone: {loan.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "15px", textAlign: "center", color: "#000000", fontSize: "14px" }}>
                    No active loans found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px", justifyContent: "flex-end" }}>
        <button
          onClick={isLoggedIn ? undefined : () => setShowLogin(true)}
          style={{
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: isLoggedIn ? "rgba(255,255,255,0.1)" : "var(--primary)",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            cursor: isLoggedIn ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          {isLoggedIn ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span className={userRole === "admin" ? "hide-mobile" : ""}>Dashboard</span>
            </>
          ) : "Login"}
        </button>

        {/* 🔔 Notifications */}
        {isLoggedIn && (
          <div
            ref={notificationRef}
            style={{ position: "relative", display: "flex", alignItems: "center", color: "#ffffff" }}
            onMouseEnter={() => setShowNotificationDropdown(true)}
            onMouseLeave={() => setShowNotificationDropdown(false)}
          >
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {expiringLoans.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "900",
                  border: "1.5px solid #000"
                }}>{expiringLoans.length}</span>
              )}
            </div>

            {/* Notification Dropdown */}
            {showNotificationDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "-50px",
                paddingTop: "15px",
                width: "280px",
                zIndex: 1001,
                animation: "fadeIn 0.2s ease-out"
              }}>
                <div style={{
                  background: "#ffffff",
                  color: "#0f172a",
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                  border: "1.5px solid #000"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1.5px solid #000", background: "rgba(0,0,0,0.02)" }}>
                    <span style={{ fontWeight: "800", fontSize: "15px", color: "#000" }}>Alerts</span>
                    <span
                      onClick={() => {
                        setShowNotificationDropdown(false);
                        if (setPage) setPage("expiring");
                      }}
                      style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "800", cursor: "pointer", textDecoration: "underline" }}
                    >
                      View All
                    </span>
                  </div>

                  <div style={{ padding: "8px" }}>
                    {expiringLoans.length > 0 ? (
                      expiringLoans.slice(0, 3).map((loan, idx) => (
                        <div key={loan._id || loan.id || idx} style={{
                          padding: "12px",
                          borderRadius: "10px",
                          marginBottom: "4px",
                          background: "rgba(239, 68, 68, 0.05)",
                          border: "1px solid rgba(239, 68, 68, 0.1)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px"
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: "800", fontSize: "14px", color: "#000" }}>{loan.name}</span>
                            <span style={{ color: "#ef4444", fontSize: "11px", fontWeight: "800" }}>EXPIRING</span>
                          </div>
                          <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: "600" }}>₹{parseFloat(loan.amount).toLocaleString()} due soon</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "20px", textAlign: "center", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>
                        No new alerts
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        {isLoggedIn && (
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
                animation: "fadeIn 0.2s ease-out",
                color: "var(--text-main)"
              }}>
                <div style={menuItemStyle} onClick={() => alert("Settings clicked")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px" }}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Settings
                </div>
                <div style={{ ...menuItemStyle, color: "#ff4757" }} onClick={() => { setIsLoggedIn(false); setUserRole(null); setShowMenu(false); setShowLogin(false); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px" }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
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