export const CATEGORIES = [
  "Food & Dining", "Transport", "Shopping", "Utilities",
  "Entertainment", "Health", "Salary", "Freelance", "Investment", "Other",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Transport: "#3b82f6",
  Shopping: "#ec4899",
  Utilities: "#8b5cf6",
  Entertainment: "#06b6d4",
  Health: "#10b981",
  Salary: "#22c55e",
  Freelance: "#84cc16",
  Investment: "#eab308",
  Other: "#94a3b8",
};

export const generateTransactions = () => {
  const templates = [
    { desc: "Monthly Salary", cat: "Salary", type: "income", amt: [45000, 55000] },
    { desc: "Freelance Project", cat: "Freelance", type: "income", amt: [8000, 20000] },
    { desc: "Stock Dividend", cat: "Investment", type: "income", amt: [1000, 5000] },
    { desc: "Grocery Store", cat: "Food & Dining", type: "expense", amt: [500, 3000] },
    { desc: "Restaurant Dinner", cat: "Food & Dining", type: "expense", amt: [300, 1500] },
    { desc: "Uber Ride", cat: "Transport", type: "expense", amt: [150, 600] },
    { desc: "Metro Recharge", cat: "Transport", type: "expense", amt: [200, 500] },
    { desc: "Online Shopping", cat: "Shopping", type: "expense", amt: [500, 5000] },
    { desc: "Electricity Bill", cat: "Utilities", type: "expense", amt: [800, 2500] },
    { desc: "Internet Bill", cat: "Utilities", type: "expense", amt: [500, 1200] },
    { desc: "Netflix", cat: "Entertainment", type: "expense", amt: [199, 649] },
    { desc: "Movie Tickets", cat: "Entertainment", type: "expense", amt: [300, 800] },
    { desc: "Gym Membership", cat: "Health", type: "expense", amt: [800, 2000] },
    { desc: "Medicine", cat: "Health", type: "expense", amt: [200, 1500] },
  ];

  const now = new Date();
  const transactions = [];
  let id = 1;

  for (let month = 5; month >= 0; month--) {
    const base = new Date(now.getFullYear(), now.getMonth() - month, 1);
    const count = 12 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)];
      const day = Math.floor(Math.random() * 28) + 1;
      const date = new Date(base.getFullYear(), base.getMonth(), day);
      const [min, max] = t.amt;
      transactions.push({
        id: id++,
        description: t.desc,
        category: t.cat,
        type: t.type,
        amount: Math.floor(Math.random() * (max - min) + min),
        date: date.toISOString().split("T")[0],
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const INITIAL_TRANSACTIONS = generateTransactions();