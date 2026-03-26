import React from 'react';

/**
 * Standardized Card component as per the Design System.
 * Enforces paddings, border, and background.
 */
const Card = ({ children, className = "", onClick, hover = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        p-6 rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden
        ${hover ? 'hover:border-neutral-600 hover:bg-neutral-800 transition-all cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Optional helper components for structure
Card.Header = ({ title, subtitle, action, className = "" }) => (
  <div className={`flex justify-between items-start mb-6 ${className}`}>
    <div>
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

Card.Content = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`mt-6 pt-6 border-t border-neutral-800 ${className}`}>
    {children}
  </div>
);

export default Card;
