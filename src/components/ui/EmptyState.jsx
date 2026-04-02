import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({ message = "No data found", sub = "" }) => (
  <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-600">
    <Inbox size={48} strokeWidth={1} className="mb-3" />
    <p className="text-base font-semibold text-slate-500 dark:text-slate-400">{message}</p>
    {sub && <p className="text-sm mt-1">{sub}</p>}
  </div>
);

export default EmptyState;