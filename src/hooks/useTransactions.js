import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export const useTransactions = () => {
  const { transactions, filters } = useApp();

  return useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((t) =>
        t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== "all") result = result.filter((t) => t.type === filters.type);
    if (filters.category !== "all") result = result.filter((t) => t.category === filters.category);

    switch (filters.sortBy) {
      case "date-asc": result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "amount-desc": result.sort((a, b) => b.amount - a.amount); break;
      case "amount-asc": result.sort((a, b) => a.amount - b.amount); break;
      default: result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [transactions, filters]);
};