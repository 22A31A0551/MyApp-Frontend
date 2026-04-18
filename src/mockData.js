export const DUMMY_CUSTOMERS = [
  { id: "CUST-001", name: "Ramesh Kumar", phone: "+91 9876543210", address: "123 Main St, Kakinada", aadhaar: "xxxx-xxxx-1234" },
  { id: "CUST-002", name: "Priya Devi", phone: "+91 9123456780", address: "45 Anna Salai, Chennai", aadhaar: "xxxx-xxxx-5678" }
];

export const DUMMY_LOANS = [
  { id: "GL-2024-041", customerId: "CUST-001", customerName: "Ramesh Kumar", amount: 50000, interestRate: 2, tenureMonths: 12, status: "Active", startDate: "2024-01-15", goldWeight: 15, goldPurity: "22K" },
  { id: "GL-2024-067", customerId: "CUST-002", customerName: "Priya Devi", amount: 75000, interestRate: 1.5, tenureMonths: 6, status: "Active", startDate: "2024-02-01", goldWeight: 20, goldPurity: "24K" }
];

export const DUMMY_VAULT = [
  { id: "VLT-1001", loanId: "GL-2024-041", description: "2 Gold Bangles", weight: 15, purity: "22K", status: "Pledged" },
  { id: "VLT-1002", loanId: "GL-2024-067", description: "1 Gold Chain", weight: 20, purity: "24K", status: "Pledged" }
];

export const DUMMY_EMIS = [
  { loanId: "GL-2024-041", dueDate: "2024-02-15", amount: 4666, status: "Paid" },
  { loanId: "GL-2024-041", dueDate: "2024-03-15", amount: 4666, status: "Overdue", daysLate: 31 },
  { loanId: "GL-2024-067", dueDate: "2024-04-01", amount: 13625, status: "Overdue", daysLate: 14 }
];
