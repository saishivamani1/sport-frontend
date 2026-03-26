// src/components/ui/Divider.jsx
import React from 'react';

export function Divider({ label, className = "" }) {
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        <span className="text-xs text-[var(--text-tertiary)] font-medium">{label}</span>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      </div>
    );
  }
  return <div className={`h-px w-full bg-[var(--border-subtle)] ${className}`} />;
}
