import React from "react";

const Badge = ({ type }) => {
  const styles = {
    income: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    expense: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles[type]}`}>
      {type}
    </span>
  );
};

export default Badge;