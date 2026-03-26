import React from 'react';

const variants = {
  primary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200 shadow-sm transition-colors',
  secondary: 'bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-600 border border-neutral-700 transition-colors',
  ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-neutral-800 active:bg-neutral-700 transition-all',
  danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 transition-colors',
  outline: 'bg-transparent text-white border border-neutral-700 hover:border-neutral-500 active:bg-neutral-800 transition-colors',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-8 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      disabled={loading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ${variantClass}
        ${sizeClass}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon size={18} className="shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
