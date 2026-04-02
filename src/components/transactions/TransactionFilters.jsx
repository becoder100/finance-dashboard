import React from "react";
import { Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

const selectClass = `
  px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700
  bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200
  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
  transition-all cursor-pointer
`;

const TransactionFilters = () => {
  const { filters, updateFilter } = useApp();

  return (
    <div className="flex flex-wrap gap-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Search transactions..."
          className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all`}
        />
      </div>
      <select className={selectClass} value={filters.type} onChange={(e) => updateFilter("type", e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select className={selectClass} value={filters.category} onChange={(e) => updateFilter("category", e.target.value)}>
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className={selectClass} value={filters.sortBy} onChange={(e) => updateFilter("sortBy", e.target.value)}>
        <option value="date-desc">Latest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>
    </div>
  );
};

export default TransactionFilters;