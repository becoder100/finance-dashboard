import React from "react";
import { Menu, Moon, Sun, Shield, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";

const TITLES = { dashboard: "Dashboard", transactions: "Transactions", insights: "Insights" };

const Header = ({ page, setOpen }) => {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-[60px] bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1
          className="text-lg font-bold tracking-tight text-slate-800 dark:text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {TITLES[page]}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Role Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {[
            { r: "viewer", label: "Viewer", Icon: Eye },
            { r: "admin", label: "Admin", Icon: Shield },
          ].map(({ r, label, Icon }) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                ${role === r
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }
              `}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white transition-all"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;