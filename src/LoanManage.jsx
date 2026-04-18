import { useState } from "react";

function LoanManage() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", phone: "", amount: "", item: "" });

  const search = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/loans/search?name=${name}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
  };

  const handleEdit = (loan) => {
    setEditingId(loan._id || loan.id);
    setEditFormData({ name: loan.name, phone: loan.phone, amount: loan.amount, item: loan.item });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/loans/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        setData(data.map(loan => ((loan._id || loan.id) === id ? { ...loan, ...editFormData } : loan)));
        setEditingId(null);
        alert("Secure record updated successfully ✅");
      } else {
        alert("Error updating record ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating record");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL ACTION: Are you sure you want to PERMANENTLY DELETE this loan record? This cannot be undone.")) {
      try {
        const res = await fetch(`http://localhost:8080/api/loans/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert(`Record purged successfully ✅`);
          setData(data.filter(loan => (loan._id || loan.id) !== id));
        } else {
          alert("Error deleting record");
        }
      } catch (error) {
        console.error(error);
        alert("Error deleting record");
      }
    }
  };

  return (
    <div 
      className="fade-in glass-card" 
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        padding: "50px",
        background: "var(--surface-lowest)",
        border: "1px solid var(--surface-high)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", marginBottom: "12px", color: "var(--text-main)", letterSpacing: "-1.5px" }}>
          Inventory Management
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", fontWeight: "500" }}>Refine, update, or purge existing loan documentation.</p>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "40px", justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1", maxWidth: "500px" }}>
          <input
            placeholder="Identify record by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%", paddingLeft: "50px"
            }}
            onKeyDown={(e) => { if (e.key === "Enter") search(); }}
          />
          <svg style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <button onClick={search} className="btn-primary" style={{ padding: "0 30px", height: "56px" }}>Execute Search</button>
      </div>

      <div style={{ background: "var(--surface-low)", borderRadius: "20px", border: "1px solid var(--surface-high)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--surface-mid)", borderBottom: "1px solid var(--surface-high)" }}>
              <th style={thStyle}>Client Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Sanctioned</th>
              <th style={thStyle}>Item Detail</th>
              <th style={thStyle}>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((loan) => (
                <tr key={loan._id || loan.id} style={{ borderBottom: "1px solid var(--surface-high)" }}>
                  <td style={tdStyle}>{loan.name}</td>
                  <td style={tdStyle}>{loan.phone}</td>
                  <td style={{ ...tdStyle, color: "var(--text-main)", fontWeight: "700" }}>₹{loan.amount}</td>
                  <td style={tdStyle}>{loan.item}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button 
                        onClick={() => handleEdit(loan)} 
                        style={{
                          padding: "6px 14px", background: "var(--surface-high)", color: "var(--primary)",
                          border: "1px solid var(--primary)", borderRadius: "8px", fontWeight: "700",
                          fontSize: "12px", cursor: "pointer", transition: "var(--transition)"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "var(--surface-high)"; e.currentTarget.style.color = "var(--primary)"; }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(loan._id || loan.id)} 
                        style={{
                          padding: "6px 14px", background: "#fee2e2", color: "#ef4444",
                          border: "1px solid #fecaca", borderRadius: "8px", fontWeight: "700",
                          fontSize: "12px", cursor: "pointer", transition: "var(--transition)"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
                      >
                        Purge
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)", fontWeight: "500" }}>No records found in current system state.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div style={modalOverlayStyle}>
          <div className="glass-card" style={modalStyle}>
            <h3 style={{ marginTop: 0, marginBottom: "25px", fontSize: "24px", fontWeight: "900", color: "var(--primary)", textAlign: "center", letterSpacing: "-0.5px" }}>Edit Secure Record</h3>
            
            <div style={formGroupStyle}>
              <label className="label-small" style={{ marginBottom: "8px" }}>Client Name</label>
              <input value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} />
            </div>
            
            <div style={formGroupStyle}>
              <label className="label-small" style={{ marginBottom: "8px" }}>Contact Information</label>
              <input value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} />
            </div>

            <div style={formGroupStyle}>
              <label className="label-small" style={{ marginBottom: "8px" }}>Sanctioned Amount (₹)</label>
              <input type="number" value={editFormData.amount} onChange={e => setEditFormData({...editFormData, amount: e.target.value})} />
            </div>

            <div style={formGroupStyle}>
              <label className="label-small" style={{ marginBottom: "8px" }}>Collateral Item</label>
              <input value={editFormData.item} onChange={e => setEditFormData({...editFormData, item: e.target.value})} />
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "35px" }}>
              <button 
                onClick={handleCancelEdit} 
                style={{ 
                  flex: 1, padding: "14px", background: "transparent", color: "var(--text-muted)", 
                  border: "1px solid var(--surface-high)", borderRadius: "12px", fontWeight: "600", cursor: "pointer" 
                }}
              >
                Cancel Edit
              </button>
              <button onClick={() => handleSaveEdit(editingId)} className="btn-primary" style={{ flex: 2, padding: "14px" }}>Commit Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "20px 24px", fontWeight: "800", color: "var(--primary)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px" };
const tdStyle = { padding: "20px 24px", color: "var(--text-main)", fontSize: "15px", fontWeight: "600" };

const modalOverlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalStyle = { background: "var(--surface-lowest)", padding: "40px", borderRadius: "28px", border: "1px solid var(--surface-high)", width: "100%", maxWidth: "450px", boxShadow: "0 40px 100px rgba(0, 0, 0, 0.1)" };
const formGroupStyle = { display: "flex", flexDirection: "column", marginBottom: "20px" };

export default LoanManage;

