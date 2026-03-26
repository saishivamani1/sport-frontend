import React from 'react';

/**
 * Standardized EmptyState as per the Design System.
 */
const EmptyState = ({ title = "No data", description = "Try something else", icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn group">
      {Icon ? (
        <div className="mb-4 text-gray-600 transition-colors group-hover:text-gray-500">
          <Icon size={48} />
        </div>
      ) : null}
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">{description}</p>
    </div>
  );
};

export default EmptyState;
