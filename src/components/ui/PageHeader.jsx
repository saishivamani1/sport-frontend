// src/components/ui/PageHeader.jsx
import React from 'react';

export function PageHeader({ title, subtitle, action, breadcrumb }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-1">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] mb-2">
            {breadcrumb}
          </nav>
        )}
        <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-[var(--text-secondary)]">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
