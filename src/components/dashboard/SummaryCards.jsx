import React from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getSummary, formatCurrency } from "../../utils/helpers";
import Card from "../ui/Card";

const SummaryCards = () => {
  const { transactions } = useApp();
  const { income, expenses, balance } = getSummary(transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      icon: Wallet,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-500",
      accent: "border-l-4 border-l-blue-500",
      change: balance >= 0 ? "↑ Positive balance" : "↓ Negative balance",
      changeColor: balance >= 0 ? "text-emerald-600" : "text-rose-500",
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      icon: TrendingUp,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
      iconColor: "text-emerald-500",
      accent: "border-l-4 border-l-emerald-500",
      change: "↑ All time",
      changeColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      icon: TrendingDown,
      iconBg: "bg-rose-50 dark:bg-rose-900/30",
      iconColor: "text-rose-500",
      accent: "border-l-4 border-l-rose-500",
      change: "↓ All time",
      changeColor: "text-rose-500 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className={`p-5 ${c.accent}`} hover>
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
            <span className={`p-2 rounded-xl ${c.iconBg}`}>
              <c.icon size={18} className={c.iconColor} />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}>{c.value}</p>
          <p className={`text-xs font-medium ${c.changeColor}`}>{c.change}</p>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;