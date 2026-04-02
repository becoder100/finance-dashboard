import React from "react";

const Card = ({ children, className = "", hover = false }) => (
  <div className={`
    bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
    shadow-sm ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" : ""}
    ${className}
  `}>
    {children}
  </div>
);

export default Card;