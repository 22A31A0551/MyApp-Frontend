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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Loan Saved to Secure Database ✅");
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
      <div style="font-family: 'Outfit', sans-serif; padding: 50px; color: #111827; max-width: 650px; margin: auto; border: 2px solid #4f46e5; border-radius: 20px; background: #fff;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #4f46e5; margin-bottom: 5px; font-size: 32px; letter-spacing: -1px;">SREENU BANKER'S</h1>
          <p style="color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Premium Gold & Silver Financing</p>
          <div style="margin-top: 10px; height: 1px; background: linear-gradient(90deg, transparent, #4f46e5, transparent); width: 100%;"></div>
        </div>
        <div style="padding: 20px 0;">
          <h3 style="color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Loan Transaction Summary</h3>
          ${Object.entries(form).map(([key, value]) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
              <span style="font-weight: 700; text-transform: capitalize; color: #6b7280; width: 180px;">${key.replace(/([A-Z])/g, ' $1')}:</span>
              <span style="color: #111827; font-weight: 500;">${value || "N/A"}</span>
            </div>
          `).join("")}
        </div>
        <div style="text-align: center; margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 30px;">
          <p style="font-style: italic; color: #6b7280; font-size: 13px;">This document serves as a digital confirmation of your loan application with Sreenu Banker's.</p>
          <p style="font-weight: 800; margin-top: 15px; font-size: 18px; color: #4f46e5;">Thank You for Your Trust 🙏</p>
        </div>
      </div>
    `;

    const newWindow = window.open("", "", "width=900,height=900");
    newWindow.document.write(`<html><head><title>Sreenu Banker's Receipt</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet"></head><body style="padding:40px; background: #f9fafb;">${printContent}</body></html>`);
    newWindow.document.close();
    setTimeout(() => {
      newWindow.print();
    }, 500);
  };

  return (
    <div 
      className="fade-in glass-card" 
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "50px",
        background: "var(--surface-lowest)",
        border: "1px solid var(--surface-high)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", marginBottom: "12px", color: "var(--text-main)", letterSpacing: "-1.5px" }}>
          New Loan Application
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", fontWeight: "500" }}>Complete the formal appraisal and application process.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "35px" }}>
        {/* Customer Details */}
        <div style={{ gridColumn: "1 / -1" }}>
          <h3 style={sectionTitleStyle}>Customer Identification</h3>
        </div>
        
        <div style={inputGroupStyle}>
          <label className="label-small">Beneficiary Name</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="e.g. Rajesh Kumar" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Contact Number</label>
          <input 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="+91 9xxx-xxxxxx" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Email Address (if applicable)</label>
          <input 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="rajesh@example.com" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Permanent Address</label>
          <input 
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            placeholder="House No, Landmark, City" 
          />
        </div>

        {/* Loan Details */}
        <div style={{ gridColumn: "1 / -1", marginTop: "20px" }}>
          <h3 style={sectionTitleStyle}>Collateral & Financing</h3>
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Collateral Item Description</label>
          <input 
            name="item" 
            value={form.item} 
            onChange={handleChange} 
            placeholder="e.g. 22K Gold Bangle" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Net Weight (gm)</label>
          <input 
            name="weight" 
            value={form.weight} 
            onChange={handleChange} 
            placeholder="0.00 ct" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Sanctioned Amount (₹)</label>
          <input 
            name="amount" 
            value={form.amount} 
            onChange={handleChange} 
            placeholder="Enter Amount" 
            style={{ fontWeight: "700", color: "#10b981" }} 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Interest Rate (% monthly)</label>
          <input 
            name="interest" 
            value={form.interest} 
            onChange={handleChange} 
            placeholder="Standard is 2%" 
          />
        </div>

        <div style={inputGroupStyle}>
          <label className="label-small">Issuance Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        justifyContent: "center", 
        gap: "20px", 
        marginTop: "50px",
        paddingTop: "40px",
        borderTop: "1px solid var(--surface-high)"
      }}>
        <button 
          onClick={handleSubmit} 
          className="btn-primary"
          style={{ padding: "16px 40px" }}
        >
          Finalize & Save Loan
        </button>
        <button 
          onClick={handlePrint} 
          className="btn-secondary"
          style={{ padding: "16px 40px" }}
        >
          Generate Receipt
        </button>
        <button 
          onClick={handleClear} 
          style={{ 
            padding: "16px 20px", 
            background: "transparent", 
            color: "var(--text-muted)", 
            border: "none", 
            borderRadius: "14px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}

const sectionTitleStyle = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  color: "var(--primary)",
  fontWeight: "800",
  marginBottom: "15px",
  display: "inline-block",
  padding: "4px 12px",
  background: "var(--surface-low)",
  borderRadius: "8px",
  border: "1px solid var(--surface-high)"
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

export default LoanEntry;