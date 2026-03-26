// src/components/ui/Badge.jsx
import React from 'react';

export function Badge({ children, variant = "default", size = "sm", className = "" }) {
  const variants = {
    default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    primary: "bg-[var(--accent-muted)] text-[var(--accent-primary)]",
    success: "bg-[#10b981]/10 text-[#10b981]",
    warning: "bg-[#f59e0b]/10 text-[#f59e0b]",
    error:   "bg-[#ef4444]/10 text-[#ef4444]",
  };
  
  const sizes = {
    xs: "text-[10px] px-1.5 py-0.5 rounded-[4px]",
    sm: "text-xs px-2 py-0.5 rounded-[var(--radius-sm)]",
    md: "text-sm px-2.5 py-1 rounded-[var(--radius-md)]",
  };
  
  return (
    <span className={`inline-flex items-center font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
