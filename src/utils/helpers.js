export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const getMonthLabel = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

export const groupByMonth = (transactions) => {
  const map = {};
  transactions.forEach((tx) => {
    const key = tx.date.slice(0, 7);
    if (!map[key]) map[key] = { month: getMonthLabel(tx.date), income: 0, expenses: 0 };
    if (tx.type === "income") map[key].income += tx.amount;
    else map[key].expenses += tx.amount;
  });
  return Object.values(map).reverse();
};

export const groupByCategory = (transactions) => {
  const map = {};
  transactions.filter((t) => t.type === "expense").forEach((tx) => {
    map[tx.category] = (map[tx.category] || 0) + tx.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getSummary = (transactions) => {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const exportToCSV = (transactions) => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [t.date, t.description, t.category, t.type, t.amount]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "transactions.csv";
  a.click();
};