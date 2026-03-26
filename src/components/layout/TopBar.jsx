// src/components/layout/TopBar.jsx
import React from 'react';
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

export function TopBar() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center">
        {/* Left side empty or reserved for breadcrumbs later */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer text-gray-400 hover:text-white">
           <BellIcon />
        </div>
        <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
