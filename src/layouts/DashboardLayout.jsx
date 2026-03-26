// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { PageContainer } from '../components/ui/PageContainer';

export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <PageContainer>
            {children}
          </PageContainer>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
