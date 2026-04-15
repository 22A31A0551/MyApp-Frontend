import { useState } from "react";

function LoanRetrieve() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const search = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/loans/search?name=${name}`
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
  };

  return (
    <div style={container}>
      <h2>🔍 Loan Retrieve</h2>

      {/* Search Box */}
      <div style={searchRow}>
        <input
          placeholder="Enter customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <button onClick={search} style={btn}>
          Search
        </button>
      </div>

      {/* Table */}
      <table border="1" style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Item</th>
          </tr>
        </thead>

        <tbody>
          {data.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.name}</td>
              <td>{loan.phone}</td>
              <td>{loan.amount}</td>
              <td>{loan.item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Styles */

const container = {
  padding: "20px",
  color: "black",
};

const searchRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  padding: "8px",
  width: "200px",
};

const btn = {
  padding: "8px 15px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default LoanRetrieve;