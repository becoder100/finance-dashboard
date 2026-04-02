import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByMonth } from "../../utils/helpers";
import Card from "../ui/Card";

const BalanceTrend = () => {
  const { transactions, darkMode } = useApp();
  const data = groupByMonth(transactions);
  const gridColor = darkMode ? "#334155" : "#e2e8f0";
  const textColor = darkMode ? "#94a3b8" : "#64748b";

  return (
    <Card className="p-5">
      <h3 className="text-base font-bold text-slate-800 dark:text-white mb-0.5"
        style={{ fontFamily: "'Syne', sans-serif" }}>Balance Trend</h3>
      <p className="text-xs text-slate-400 mb-4">Income vs Expenses — last 6 months</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} />
          <YAxis tick={{ fontSize: 10, fill: textColor }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, ""]}
            contentStyle={{
              background: darkMode ? "#1e293b" : "#fff",
              border: `1px solid ${gridColor}`,
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#gIncome)" strokeWidth={2} name="Income" dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fill="url(#gExpense)" strokeWidth={2} name="Expenses" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceTrend;