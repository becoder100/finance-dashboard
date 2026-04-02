import React from "react";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X, IndianRupee } from "lucide-react";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Transactions", icon: ArrowLeftRight, page: "transactions" },
  { label: "Insights", icon: Lightbulb, page: "insights" },
];

const Sidebar = ({ page, setPage, open, setOpen }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      />
    )}
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col
      bg-slate-900 dark:bg-slate-950 transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
          <IndianRupee size={18} className="text-white" />
        </div>
        <span className="text-white font-display text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          FinFlow
        </span>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-slate-400 hover:text-white lg:hidden p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ label, icon: Icon, page: p }) => (
          <button
            key={p}
            onClick={() => { setPage(p); setOpen(false); }}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-150
              ${page === p
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }
            `}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-slate-700/50">
        <p className="text-xs text-slate-600">FinFlow v1.0 · Delhi, IN</p>
      </div>
    </aside>
  </>
);

export default Sidebar;