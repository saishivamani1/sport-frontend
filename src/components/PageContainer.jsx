import React from 'react';

/**
 * Standardized PageContainer as per the Design System
 * Enforces max-width, horizontal centering, and consistent padding.
 */
const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 py-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
