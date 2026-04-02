import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

const empty = {
  description: "", category: "Food & Dining", type: "expense",
  amount: "", date: new Date().toISOString().split("T")[0],
};

const inputClass = `
  w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600
  bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100
  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all
`;

const TransactionModal = ({ existing, onClose }) => {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(existing || empty);
  const [error, setError] = useState("");

  useEffect(() => setForm(existing || empty), [existing]);

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (!form.description.trim() || !form.amount || !form.date) {
      setError("Please fill in all fields.");
      return;
    }
    const tx = { ...form, amount: Number(form.amount) };
    existing ? editTransaction(tx) : addTransaction(tx);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            {existing ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {error && <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-3 py-2 rounded-lg">{error}</p>}

          {[
            { label: "Description", key: "description", type: "text", placeholder: "e.g. Grocery Store" },
            { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0" },
            { label: "Date", key: "date", type: "date" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
              <input
                className={inputClass}
                type={type}
                value={form[key]}
                onChange={(e) => handle(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
            <select className={inputClass} value={form.category} onChange={(e) => handle("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Type</label>
            <div className="flex gap-2">
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  onClick={() => handle("type", t)}
                  className={`
                    flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all
                    ${form.type === t
                      ? t === "income"
                        ? "bg-emerald-500 text-white"
                        : "bg-rose-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all shadow-sm"
          >
            {existing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;