import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { calculateElapsedInterestMonths, calculateMonthlyInterestAmount } from "./interestUtils";

const Analytics = ({ setPage }) => {
  const [loans, setLoans] = useState([]);
  const [expiringCount, setExpiringCount] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansRes, expiringRes] = await Promise.all([
          fetch(`${API_URL}/api/loans`),
          fetch(`${API_URL}/api/loans/expiring`)
        ]);

        const loansData = await loansRes.json();
        const expiringData = await expiringRes.json();

        if (Array.isArray(loansData)) setLoans(loansData);
        if (Array.isArray(expiringData)) setExpiringCount(expiringData.length);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate unique years for the dropdown
  const availableYears = (() => {
    const years = new Set([new Date().getFullYear()]);
    loans.forEach(loan => {
      const year = new Date(loan.date).getFullYear();
      if (!isNaN(year)) years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  })();

  // Metrics Calculation (Overall Totals)
  const allClosedLoans = loans.filter(l => l.status?.toLowerCase() === "closed");
  const allActiveLoans = loans.filter(l => l.status?.toLowerCase() !== "closed");

  const totalLoanAmount = allActiveLoans.reduce((sum, l) => sum + (parseFloat(l.amount) || 0), 0);
  const totalLoansCount = loans.length;
  const totalActiveLoansCount = allActiveLoans.length;

  // Prepare Chart Data (Filtered by Selected Year)
  const chartData = (() => {
    const data = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Use active loans for the selected year for the chart
    const activeLoansForSelectedYear = allActiveLoans.filter(l => new Date(l.date).getFullYear() === selectedYear);

    months.forEach((monthLabel, monthIndex) => {
      const monthlyTotal = activeLoansForSelectedYear.reduce((sum, loan) => {
        const loanDate = new Date(loan.date);
        if (loanDate.getMonth() === monthIndex) {
          return sum + (parseFloat(loan.amount) || 0);
        }
        return sum;
      }, 0);

      data.push({
        name: monthLabel,
        value: monthlyTotal
      });
    });
    return data;
  })();

  const totalAccruedInterest = allActiveLoans.reduce((sum, l) => {
    const months = calculateElapsedInterestMonths(l.createdAt, l.date);
    const monthly = calculateMonthlyInterestAmount(l.amount, l.interest);
    return sum + (months * monthly);
  }, 0);

  const stats = [
    { label: "Total Loan Amount", value: `₹${totalLoanAmount.toLocaleString()}`, color: "#6366f1", icon: "💰" },
    { label: "Accrued Interest", value: `₹${totalAccruedInterest.toLocaleString()}`, color: "#f59e0b", icon: "📈" },
    { label: "Total Loans", value: totalLoansCount, color: "#22d3ee", icon: "📊" },
    { label: "Active Loans", value: totalActiveLoansCount, color: "#10b981", icon: "✅" },
    { label: "Expiring Loans", value: expiringCount, color: "#ef4444", icon: "⏰" },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "white" }}>
        <h3>Loading Analytics...</h3>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>Business Analytics</h2>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="responsive-grid" style={{
        marginBottom: "40px"
      }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "25px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border: `1px solid ${stat.color}40`,
              background: `linear-gradient(135deg, rgba(255,255,255,0.7), ${stat.color}10)`
            }}
          >
            <div style={{ fontSize: "24px" }}>{stat.icon}</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="glass-card" style={{ padding: "30px", borderRadius: "24px", marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#111827" }}>Monthly Business Volume</h3>

          {/* Year Selector (Only for Graph) */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontWeight: "700", color: "#64748b", fontSize: "14px" }}>Graph Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1.5px solid #000",
                background: "white",
                fontWeight: "700",
                cursor: "pointer",
                outline: "none",
                fontSize: "14px"
              }}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="analytics-chart-container" style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(1) + "k" : value}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                barSize={40}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === new Date().getMonth() ? "#6366f1" : "#818cf8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
