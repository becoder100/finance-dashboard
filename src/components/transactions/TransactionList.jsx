import React, { useState } from "react";
import { Pencil, Trash2, Plus, Download } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency, formatDate, exportToCSV } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";
import TransactionModal from "./TransactionModal";
import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";
import Card from "../ui/Card";

const TransactionList = () => {
  const { role, deleteTransaction } = useApp();
  const transactions = useTransactions();
  const [modal, setModal] = useState(null);

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Transactions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{transactions.length} records found</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(transactions)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <Download size={13} /> Export
          </button>
          {role === "admin" && (
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all shadow-sm"
            >
              <Plus size={13} /> Add
            </button>
          )}
        </div>
      </div>

      {transactions.length === 0 ? (
        <EmptyState message="No transactions found" sub="Try adjusting your filters" />
      ) : (
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                {["Date", "Description", "Category", "Type", "Amount", ...(role === "admin" ? ["Actions"] : [])].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3.5 text-slate-400 dark:text-slate-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 dark:text-slate-200 max-w-[160px] truncate">{tx.description}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        background: (CATEGORY_COLORS[tx.category] || "#94a3b8") + "22",
                        color: CATEGORY_COLORS[tx.category] || "#94a3b8",
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5"><Badge type={tx.type} /></td>
                  <td className={`px-4 py-3.5 font-bold whitespace-nowrap ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setModal(tx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <TransactionModal
          existing={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </Card>
  );
};

export default TransactionList;