// src/components/ui/EmptyState.jsx
import React from 'react';

export function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-6 text-center ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)]
          flex items-center justify-center mb-4 text-[var(--text-tertiary)] border border-[var(--border-subtle)]">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-tertiary)] mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
