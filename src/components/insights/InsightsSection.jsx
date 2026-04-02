import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByMonth, groupByCategory, formatCurrency, getSummary } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";
import Card from "../ui/Card";

const KPI = ({ label, value, sub, valueColor = "text-slate-800 dark:text-white" }) => (
  <Card className="p-5" hover>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{label}</p>
    <p className={`text-2xl font-bold mb-1 ${valueColor}`} style={{ fontFamily: "'Syne', sans-serif" }}>{value}</p>
    <p className="text-xs text-slate-400">{sub}</p>
  </Card>
);

const InsightsSection = () => {
  const { transactions, darkMode } = useApp();
  const monthly = groupByMonth(transactions);
  const categories = groupByCategory(transactions);
  const { income, expenses } = getSummary(transactions);
  const top = categories[0];
  const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;
  const current = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const expenseDiff = current && prev
    ? (((current.expenses - prev.expenses) / prev.expenses) * 100).toFixed(1) : null;

  const gridColor = darkMode ? "#334155" : "#e2e8f0";
  const textColor = darkMode ? "#94a3b8" : "#64748b";
  const tooltipStyle = {
    background: darkMode ? "#1e293b" : "#fff",
    border: `1px solid ${gridColor}`,
    borderRadius: 10, fontSize: 12,
  };

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPI label="Top Spending" value={top?.name || "—"} sub={top ? formatCurrency(top.value) : ""} />
        <KPI
          label="Savings Rate"
          value={`${savingsRate}%`}
          sub={savingsRate >= 20 ? "Healthy 🎉" : "Save more"}
          valueColor={savingsRate >= 20 ? "text-emerald-500" : "text-rose-500"}
        />
        <KPI
          label="Monthly Change"
          value={expenseDiff !== null ? `${expenseDiff > 0 ? "+" : ""}${expenseDiff}%` : "—"}
          sub="Expenses vs last month"
          valueColor={expenseDiff < 0 ? "text-emerald-500" : "text-rose-500"}
        />
        <KPI
          label="Avg Monthly Expense"
          value={formatCurrency(Math.round(expenses / (monthly.length || 1)))}
          sub={`Over ${monthly.length} months`}
        />
      </div>

      {/* Monthly Comparison */}
      <Card className="p-5">
        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
          Monthly Comparison
        </h3>
        <p className="text-xs text-slate-400 mb-4">Income vs Expenses per month</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} />
            <YAxis tick={{ fontSize: 10, fill: textColor }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, ""]} contentStyle={tooltipStyle} />
            <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" maxBarSize={28} />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-5">
        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
          Category-wise Spending
        </h3>
        <p className="text-xs text-slate-400 mb-4">Where your money goes</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categories} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis type="number" tick={{ fontSize: 10, fill: textColor }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <YAxis dataKey="name" type="category" width={115} tick={{ fontSize: 11, fill: textColor }} />
            <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, ""]} contentStyle={tooltipStyle} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {categories.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default InsightsSection;