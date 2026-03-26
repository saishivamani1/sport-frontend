import React from 'react';

export default function AppLoadingSkeleton() {
  return (
    <div className="min-h-screen flex bg-[var(--bg-base)]">
      {/* Sidebar skeleton */}
      <div className="w-60 h-screen border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]
        flex flex-col gap-2 p-4 animate-pulse flex-shrink-0">
        <div className="h-8 w-32 rounded-lg bg-[var(--bg-elevated)] mb-4" />
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="h-9 rounded-lg bg-[var(--bg-elevated)]" />
        ))}
      </div>
      {/* Main skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-[var(--border-subtle)] animate-pulse
          bg-[var(--bg-surface)]" />
        <div className="p-8 space-y-4 animate-pulse">
          <div className="h-8 w-48 rounded-lg bg-[var(--bg-elevated)]" />
          <div className="grid grid-cols-3 gap-6">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-[var(--bg-elevated)]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
