// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export function Sidebar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = user?.role === 'ADMIN' ? [
    { label: "Admin Hub", href: "/admin/dashboard", icon: <ShieldIcon /> },
    { label: "Verifications", href: "/admin/verifications", icon: <UserIcon /> },
    { label: "Applications", href: "/admin/applications", icon: <CompassIcon /> },
    { label: "Posts", href: "/admin/posts", icon: <HomeIcon /> },
    { label: "Events", href: "/admin/tournaments", icon: <TrophyIcon /> },
  ] : [
    { label: "Dashboard", href: "/athlete/dashboard", icon: <HomeIcon /> },
    { label: "Discovery", href: "/discovery", icon: <CompassIcon /> },
    { label: "Tournaments", href: "/tournaments", icon: <TrophyIcon /> },
    { label: "Identity", href: "/athlete/settings", icon: <UserIcon /> },
  ];

  if (loading) return <aside className="w-60 h-screen bg-[var(--bg-surface)] animate-pulse shrink-0 border-r border-[var(--border-subtle)]" />;
  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-60 h-screen bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-subtle)]">
        <Link to="/" className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          SportsHub
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors
              ${isActive 
                ? "bg-[var(--accent-muted)] text-[var(--accent-primary)] font-medium" 
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }
            `}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="h-16 border-t border-[var(--border-subtle)] flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-sm font-medium">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-primary)] leading-tight truncate max-w-[100px]">{user.name}</span>
            <span className="text-xs text-[var(--text-tertiary)] leading-tight">{user.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors" title="Logout">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </aside>
  );
}
