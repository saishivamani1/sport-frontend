// src/components/ui/Button.jsx
import React from 'react';

const Spinner = ({ size }) => {
  const sizeMap = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };
  return (
    <svg 
      className={`animate-spin ${sizeMap[size]} text-current`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-[var(--radius-md)] transition-all duration-[var(--transition-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-[var(--accent-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    select-none whitespace-nowrap
  `;

  const variants = {
    primary: `bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]
                shadow-[var(--shadow-sm)] active:scale-[0.98]`,
    secondary: `bg-[var(--bg-elevated)] text-[var(--text-primary)]
                border border-[var(--border-default)]
                hover:bg-[var(--bg-surface)] hover:border-[var(--border-strong)]
                active:scale-[0.98]`,
    ghost: `text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]
                hover:text-[var(--text-primary)] active:scale-[0.98]`,
    danger: `bg-[var(--status-error)] text-white hover:opacity-90 active:scale-[0.98]`,
    link: `text-[var(--text-link)] hover:underline underline-offset-4 h-auto px-0`,
  };

  const sizes = {
    xs: "h-7 px-3 text-xs",
    sm: "h-8 px-3.5 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-11 px-6 text-base",
    xl: "h-12 px-8 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading ? <Spinner size={size} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
