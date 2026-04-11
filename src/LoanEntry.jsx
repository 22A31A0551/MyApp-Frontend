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
      handleClear(); // clear form after submit
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

  // ✅ PRINT FUNCTION
  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial; padding: 20px;">
        
        <h2 style="text-align: center;">SAI FINANCE COMPANY</h2>
        <p style="text-align: center;">
          Kakinada, Andhra Pradesh <br/>
          Phone: 9876543210
        </p>

        <hr/>

        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Phone:</strong> ${form.phone}</p>
        <p><strong>Email:</strong> ${form.email || "N/A"}</p>
        <p><strong>Address:</strong> ${form.address}</p>
        <p><strong>Item:</strong> ${form.item}</p>
        <p><strong>Weight:</strong> ${form.weight}</p>
        <p><strong>Amount:</strong> ₹${form.amount}</p>
        <p><strong>Interest:</strong> ${form.interest}%</p>
        <p><strong>Date:</strong> ${form.date}</p>

        <hr/>

        <p style="text-align:center;">Thank You 🙏</p>

      </div>
    `;

    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center" }}>Loan Entry</h2>

      <div style={row}>
        <label style={label}>Customer Name :</label>
        <input name="name" value={form.name} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Phone :</label>
        <input name="phone" value={form.phone} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Email (optional) :</label>
        <input name="email" value={form.email} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Address :</label>
        <input name="address" value={form.address} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Item :</label>
        <input name="item" value={form.item} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Weight :</label>
        <input name="weight" value={form.weight} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Amount :</label>
        <input name="amount" value={form.amount} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Interest :</label>
        <input name="interest" value={form.interest} onChange={handleChange} style={input} />
      </div>

      <div style={row}>
        <label style={label}>Date :</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} style={input} />
      </div>

      {/* ✅ BUTTONS */}
      <div style={btnRow}>
        <button onClick={handleSubmit} style={btn}>Submit</button>
        <button onClick={handleClear} style={btnSecondary}>Clear</button>
        <button onClick={handlePrint} style={btnPrint}>Print</button>
      </div>
    </div>
  );
}

/* Styles */

const container = {
  backgroundColor: "white",
  color: "black",
  padding: "20px",
  borderRadius: "12px",
  width: "450px",
  margin: "40px auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  border: "2px solid black",
};

const row = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const label = {
  width: "170px",
};

const input = {
  flex: 1,
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid black",
};

const btnRow = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "15px",
};

const btn = {
  width: "120px",
  padding: "8px",
  backgroundColor: "blue",
  color: "white",
  border: "1px solid black",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnSecondary = {
  width: "120px",
  padding: "8px",
  backgroundColor: "gray",
  color: "white",
  border: "1px solid black",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnPrint = {
  width: "120px",
  padding: "8px",
  backgroundColor: "green",
  color: "white",
  border: "1px solid black",
  borderRadius: "6px",
  cursor: "pointer",
};

export default LoanEntry;