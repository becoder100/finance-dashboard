import React, { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date-desc",
  });

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  }, []);

  const editTransaction = useCallback((updated) => {
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <AppContext.Provider value={{
      transactions, role, setRole, darkMode, setDarkMode,
      filters, updateFilter, addTransaction, editTransaction, deleteTransaction,
    }}>
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};