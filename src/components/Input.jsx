import React from 'react';

/**
 * Standardized Input component as per the Design System.
 * Enforces h-10, px-3, rounded-lg, and border styles.
 */
const Input = ({ label, error, className = "", id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full h-10 px-3 rounded-lg 
          bg-neutral-900 border border-neutral-700 
          text-white text-sm placeholder-gray-500
          transition-all duration-200 outline-none
          focus:ring-1 focus:ring-white focus:border-white
          ${error ? 'border-red-500/60 focus:ring-red-500' : 'hover:border-neutral-500'}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
