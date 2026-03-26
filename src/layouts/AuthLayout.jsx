// src/layouts/AuthLayout.jsx
import React from 'react';
import { Card } from '../components/ui/Card';

const Logo = () => (
  <div className="flex justify-center mb-6">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
      </div>
      <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">SportsHub</span>
    </div>
  </div>
);

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <Logo />
        <Card padding="lg" className="w-full">
          {children}
        </Card>
      </div>
    </div>
  );
}
