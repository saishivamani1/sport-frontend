// src/components/ui/Card.jsx
import React from 'react';

export function Card({ children, padding = "default", hover = false, onClick, className = "" }) {
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--bg-surface)]
        border border-[var(--border-subtle)]
        rounded-[var(--radius-lg)]
        shadow-[var(--shadow-sm)]
        ${paddings[padding]}
        ${hover ? "hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-all duration-200 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, divider = true, className = "" }) {
  return (
    <div className={`mb-4 pb-4 ${divider ? "border-b border-[var(--border-subtle)]" : ""} ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = "" }) {
  return <h3 className={`text-base font-semibold text-[var(--text-primary)] ${className}`}>{children}</h3>;
};

Card.Description = function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-[var(--text-secondary)] mt-0.5 ${className}`}>{children}</p>;
};

Card.Footer = function CardFooter({ children, className = "" }) {
  return (
    <div className={`mt-4 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};
