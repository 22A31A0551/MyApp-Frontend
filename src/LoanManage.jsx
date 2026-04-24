import { useState } from "react";
import { API_URL } from "./config";

function LoanManage() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", phone: "", amount: "", item: "" });

  const search = async () => {
    try {
      const res = await fetch(`${API_URL}/api/loans/search?name=${name}`);
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
      const res = await fetch(`${API_URL}/api/loans/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        setData(data.map(loan => ((loan._id || loan.id) === id ? { ...loan, ...editFormData } : loan)));
        setEditingId(null);
        alert("Record updated successfully");
      } else {
        alert("Error updating record");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating record");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this loan record?")) {
      try {
        const res = await fetch(`${API_URL}/api/loans/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert(`Record deleted successfully`);
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
      className="glass" 
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>Manage Loans</h2>
        <p style={{ color: "var(--text-muted)" }}>Edit existing records or delete canceled loans.</p>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "30px", justifyContent: "center", alignItems: "center" }}>
        <input
          placeholder="Enter customer name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1", maxWidth: "400px", padding: "12px 16px", borderRadius: "10px",
            background: "#ffffff", border: "1px solid #000000", color: "#000000", outline: "none"
          }}
          onKeyDown={(e) => { if (e.key === "Enter") search(); }}
        />
        <button onClick={search} style={btnStyle("#f59e0b")}>Search</button>
      </div>

      <div style={{ background: "var(--surface-color)", borderRadius: "12px", border: "1px solid var(--glass-border)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid var(--glass-border)" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((loan) => (
                <tr key={loan._id || loan.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <td style={tdStyle}>{loan.name}</td>
                  <td style={tdStyle}>{loan.phone}</td>
                  <td style={tdStyle}>₹{loan.amount}</td>
                  <td style={tdStyle}>{loan.item}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEdit(loan)} style={{...actionBtnStyle, background: "#3b82f6"}}>Edit</button>
                    <button onClick={() => handleDelete(loan._id || loan.id)} style={{...actionBtnStyle, background: "#ef4444", marginLeft: "10px"}}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#000" }}>Edit Loan Record</h3>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} style={modalInputStyle} />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Phone</label>
              <input value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} style={modalInputStyle} />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Amount (₹)</label>
              <input type="number" value={editFormData.amount} onChange={e => setEditFormData({...editFormData, amount: e.target.value})} style={modalInputStyle} />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Item</label>
              <input value={editFormData.item} onChange={e => setEditFormData({...editFormData, item: e.target.value})} style={modalInputStyle} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "25px" }}>
              <button onClick={handleCancelEdit} style={{...btnStyle("#6b7280"), padding: "10px 20px"}}>Cancel</button>
              <button onClick={() => handleSaveEdit(editingId)} style={{...btnStyle("#10b981"), padding: "10px 20px"}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: "16px", fontWeight: "600", color: "var(--text-main)", fontSize: "14px", textTransform: "uppercase" };
const tdStyle = { padding: "16px", color: "#000000", fontSize: "15px", fontWeight: "500" };
const btnStyle = (bg) => ({ padding: "12px 30px", background: bg, color: "white", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" });
const actionBtnStyle = { padding: "6px 12px", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" };

const modalOverlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalStyle = { background: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid var(--glass-border)", width: "100%", maxWidth: "400px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" };
const formGroupStyle = { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "15px" };
const labelStyle = { fontSize: "13px", color: "#000", fontWeight: "600" };
const modalInputStyle = { width: "100%", padding: "10px 14px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", color: "#000", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

export default LoanManage;
