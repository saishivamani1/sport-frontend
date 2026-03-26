import React from 'react';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';

/**
 * Standard Main Layout for public pages.
 * Includes Navbar and PageContainer for perfect alignment.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10">
      <Navbar />
      <main className="pt-16">
        <PageContainer>
          {children}
        </PageContainer>
      </main>
    </div>
  );
};

export default MainLayout;
