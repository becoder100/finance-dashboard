# 💰 FinFlow — Finance Dashboard

A clean, interactive, and responsive personal finance dashboard built with **React** and **Tailwind CSS**. Track your income, expenses, and spending patterns with a beautiful UI and role-based access control.

---

## 🖥️ Live Preview

> Run locally with `npm start` — see setup instructions below.

---

## ✨ Features

### 📊 Dashboard Overview
- Summary cards showing **Total Balance**, **Income**, and **Expenses**
- **Area chart** for balance trend over the last 6 months
- **Donut chart** for spending breakdown by category

### 💳 Transactions
- Full transaction list with **date**, **description**, **category**, **type**, and **amount**
- **Search** transactions by name or category
- **Filter** by type (Income / Expense) and category
- **Sort** by date or amount
- **Export** transactions to CSV
- **Add / Edit / Delete** transactions (Admin role only)

### 💡 Insights
- **KPI cards** — Top spending category, Savings Rate, Monthly change, Avg monthly expense
- **Monthly comparison** bar chart (Income vs Expenses)
- **Category-wise spending** horizontal bar chart

### 🔐 Role-Based UI
- **Viewer** — Read-only access, can explore all data
- **Admin** — Can add, edit, and delete transactions
- Switch roles instantly using the toggle in the header

### 🌙 Dark Mode
- Full dark mode support across all components
- Toggle via the moon/sun icon in the header

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Tailwind CSS v3 | Styling |
| Recharts | Charts and visualizations |
| Lucide React | Icons |
| React Context API | State management |

---

## 📁 Project Structure
```
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   ├── Header.jsx         # Top header with role switcher & dark mode
│   │   │   └── Layout.jsx         # Main shell layout
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.jsx   # Balance, Income, Expense cards
│   │   │   ├── BalanceTrend.jsx   # Area chart - 6 month trend
│   │   │   └── SpendingBreakdown.jsx # Donut chart - category breakdown
│   │   ├── transactions/
│   │   │   ├── TransactionList.jsx    # Table with edit/delete (admin)
│   │   │   ├── TransactionFilters.jsx # Search, filter, sort controls
│   │   │   └── TransactionModal.jsx   # Add/Edit transaction form
│   │   ├── insights/
│   │   │   └── InsightsSection.jsx    # KPIs + bar charts
│   │   └── ui/
│   │       ├── Badge.jsx          # Income/Expense type badge
│   │       ├── Card.jsx           # Reusable card wrapper
│   │       └── EmptyState.jsx     # Empty state UI
│   ├── context/
│   │   └── AppContext.jsx         # Global state (transactions, role, filters, dark mode)
│   ├── data/
│   │   └── mockData.js            # Mock transaction generator + category config
│   ├── hooks/
│   │   └── useTransactions.js     # Filtered & sorted transactions hook
│   ├── pages/
│   │   ├── Dashboard.jsx          # Dashboard page
│   │   ├── Transactions.jsx       # Transactions page
│   │   └── Insights.jsx           # Insights page
│   ├── utils/
│   │   └── helpers.js             # formatCurrency, groupByMonth, getSummary, exportCSV
│   ├── App.jsx                    # Root component with page routing
│   └── index.css                  # Tailwind directives + Google Fonts
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v16 or higher
- **npm** v8 or higher

Check versions:
```bash
node -v
npm -v
```

### Installation

**1. Create the React app:**
```bash
npx create-react-app finance-dashboard
cd finance-dashboard
```

**2. Install Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**3. Install dependencies:**
```bash
npm install recharts lucide-react
```

**4. Add all project files** as per the structure above.

**5. Configure `tailwind.config.js`:**
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

**6. Add Google Fonts to `public/index.html`** inside `<head>`:
```html
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
  rel="stylesheet"
/>
```

**7. Start the development server:**
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Build for Production
```bash
npm run build
```

Output will be in the `/build` folder, ready to deploy on Vercel, Netlify, or any static host.

---

## 🎮 How to Use

### Switching Roles
Click the **Viewer / Admin** toggle in the top-right header.

| Role | Permissions |
|------|------------|
| Viewer | View dashboard, transactions, insights |
| Admin | All of the above + Add, Edit, Delete transactions |

### Adding a Transaction *(Admin only)*
1. Go to **Transactions** page
2. Click the **+ Add** button (top right of the table)
3. Fill in Description, Amount, Category, Type, Date
4. Click **Add Transaction**

### Filtering Transactions
Use the filter bar on the Transactions page:
- 🔍 **Search** — by description or category name
- **Type filter** — All / Income / Expense
- **Category filter** — Filter by specific category
- **Sort** — Latest first, Oldest first, Highest/Lowest amount

### Exporting Data
Click the **Export** button on the Transactions page to download all visible transactions as a `.csv` file.

### Dark Mode
Click the 🌙 **moon icon** in the top-right header to toggle dark mode.

---

## 📊 Mock Data

The app ships with auto-generated mock data covering **6 months** of transactions across 10 categories:

| Category | Type |
|----------|------|
| Salary | Income |
| Freelance | Income |
| Investment | Income |
| Food & Dining | Expense |
| Transport | Expense |
| Shopping | Expense |
| Utilities | Expense |
| Entertainment | Expense |
| Health | Expense |
| Other | Expense |

Data is generated fresh on every app load via `src/data/mockData.js`.

---

## 🧠 State Management

All global state is managed via **React Context API** in `src/context/AppContext.jsx`:

| State | Description |
|-------|-------------|
| `transactions` | Full list of all transactions |
| `role` | Current user role (`viewer` or `admin`) |
| `darkMode` | Boolean for dark/light theme |
| `filters` | `{ search, type, category, sortBy }` |

Filtering and sorting logic lives in the custom hook `src/hooks/useTransactions.js` using `useMemo` for performance.

---

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< 1024px`) | Sidebar hidden, accessible via hamburger menu |
| Desktop (`≥ 1024px`) | Sidebar always visible |
| Summary cards | 1 column on mobile, 3 columns on desktop |
| Charts | Stacked on mobile, side-by-side on desktop |

---

## 🎨 Design Decisions

- **Font pairing** — `Syne` (headings) + `DM Sans` (body) for a modern financial aesthetic
- **Color system** — Slate-based neutral palette with blue accent, emerald for income, rose for expenses
- **Dark mode** — Implemented via Tailwind's `class` strategy, toggled by wrapping root `div` with `dark` class
- **Charts** — Recharts with custom gradients, matching the dark/light theme dynamically
- **Empty states** — Graceful fallback UI when no transactions match filters

---

## 📦 Dependencies
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "recharts": "^2.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

---

## 🙋 Assumptions Made

- All monetary values are in **Indian Rupees (₹)**
- Mock data is regenerated on every page load (no backend/database)
- Role switching is frontend-only for demonstration purposes
- No authentication system is implemented

---

## 🔮 Future Improvements

- [ ] Backend API integration (Node.js / Firebase)
- [ ] User authentication
- [ ] Data persistence with a database
- [ ] Budget goals and alerts
- [ ] PDF report export
- [ ] Multi-currency support
- [ ] Recurring transaction tracking

---

## 👨‍💻 Author

Built as part of a frontend evaluation assignment.  
Designed and developed with React + Tailwind CSS.

---

## 📄 License

This project is for evaluation purposes only.
