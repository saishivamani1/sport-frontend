// src/components/ui/FormField.jsx
import React from 'react';

const ErrorIcon = ({ size = 12 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helper,
  leftIcon,
  rightElement,
  required,
  disabled,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {required && <span className="text-[var(--status-error)] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full h-10 px-3 rounded-[var(--radius-md)]
            bg-[var(--bg-elevated)]
            border ${error ? "border-[var(--status-error)]" : "border-[var(--border-default)]"}
            text-sm text-[var(--text-primary)]
            placeholder:text-[var(--text-tertiary)]
            transition-colors duration-[var(--transition-fast)]
            focus:outline-none focus:ring-2
            focus:ring-[var(--accent-primary)] focus:ring-offset-1
            focus:ring-offset-[var(--bg-base)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? "pl-9" : ""}
            ${rightElement ? "pr-10" : ""}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-[var(--status-error)] flex items-center gap-1">
          <ErrorIcon size={12} /> {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-xs text-[var(--text-tertiary)]">{helper}</p>
      )}
    </div>
  );
}
