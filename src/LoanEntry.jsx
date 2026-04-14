import { useState } from "react";

function LoanEntry() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    item: "",
    weight: "",
    amount: "",
    interest: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Loan Saved to Database ✅");
        handleClear();
      } else {
        alert("Error saving data ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  const handleClear = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      address: "",
      item: "",
      weight: "",
      amount: "",
      interest: "",
      date: "",
    });
  };

  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial; padding: 40px; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #6366f1; margin-bottom: 5px;">SAI FINANCE COMPANY</h1>
          <p style="color: #64748b; font-size: 14px;">Kakinada, Andhra Pradesh • Ph: 9876543210</p>
        </div>
        <div style="border-top: 2px solid #f1f5f9; padding-top: 20px;">
          ${Object.entries(form).map(([key, value]) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #f8fafc; padding-bottom: 8px;">
              <span style="font-weight: 600; text-transform: capitalize; color: #475569;">${key}:</span>
              <span style="color: #1e293b;">${value || "N/A"}</span>
            </div>
          `).join("")}
        </div>
        <div style="text-align: center; margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 20px;">
          <p style="font-style: italic; color: #64748b;">This is a computer-generated receipt.</p>
          <p style="font-weight: 700; margin-top: 10px;">Thank You 🙏</p>
        </div>
      </div>
    `;

    const newWindow = window.open("", "", "width=800,height=800");
    newWindow.document.write(`<html><head><title>Loan Receipt</title></head><body style="padding:20px;">${printContent}</body></html>`);
    newWindow.document.close();
    setTimeout(() => {
      newWindow.print();
    }, 500);
  };

  return (
    <div 
      className="glass" 
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>New Loan Application</h2>
        <p style={{ color: "var(--text-muted)" }}>Fill in the details below to complete the loan entry.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Customer Details */}
        <div style={{ gridColumn: "1 / -1" }}>
          <h3 style={sectionTitleStyle}>Customer Information</h3>
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email Address (Optional)</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Residential Address</label>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Street, City, State" style={{width: "100%"}} />
        </div>

        {/* Loan Details */}
        <div style={{ gridColumn: "1 / -1", marginTop: "15px" }}>
          <h3 style={sectionTitleStyle}>Loan Details</h3>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Collateral Item</label>
          <input name="item" value={form.item} onChange={handleChange} placeholder="Gold Ornament" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Weight (gm)</label>
          <input name="weight" value={form.weight} onChange={handleChange} placeholder="0.00" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Loan Amount (₹)</label>
          <input name="amount" value={form.amount} onChange={handleChange} placeholder="50,000" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Interest Rate (%)</label>
          <input name="interest" value={form.interest} onChange={handleChange} placeholder="2.0" style={{width: "100%"}} />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Application Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} style={{width: "100%"}} />
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginTop: "40px",
        paddingTop: "30px",
        borderTop: "1px solid var(--glass-border)"
      }}>
        <button 
          onClick={handleSubmit} 
          style={{ 
            padding: "12px 30px", 
            background: "var(--primary)", 
            color: "white", 
            border: "none", 
            borderRadius: "10px",
            fontWeight: "600"
          }}
        >
          Submit Loan
        </button>
        <button 
          onClick={handleClear} 
          style={{ 
            padding: "12px 30px", 
            background: "var(--surface-color)", 
            color: "var(--text-main)", 
            border: "1px solid var(--glass-border)", 
            borderRadius: "10px",
            fontWeight: "600"
          }}
        >
          Clear Form
        </button>
        <button 
          onClick={handlePrint} 
          style={{ 
            padding: "12px 30px", 
            background: "var(--accent)", 
            color: "black", 
            border: "none", 
            borderRadius: "10px",
            fontWeight: "600"
          }}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

const sectionTitleStyle = {
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--primary)",
  fontWeight: "700",
  marginBottom: "10px",
  opacity: 0.9
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const labelStyle = {
  fontSize: "13px",
  color: "var(--text-muted)",
  marginLeft: "4px"
};

export default LoanEntry;