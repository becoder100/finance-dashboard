import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";
import Card from "../ui/Card";

const SpendingBreakdown = () => {
  const { transactions, darkMode } = useApp();
  const data = groupByCategory(transactions).slice(0, 6);

  return (
    <Card className="p-5">
      <h3 className="text-base font-bold text-slate-800 dark:text-white mb-0.5"
        style={{ fontFamily: "'Syne', sans-serif" }}>Spending Breakdown</h3>
      <p className="text-xs text-slate-400 mb-4">Top categories by expense</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#94a3b8"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [formatCurrency(v), ""]}
            contentStyle={{
              background: darkMode ? "#1e293b" : "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SpendingBreakdown;