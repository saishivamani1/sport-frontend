// src/components/ui/PageContainer.jsx
export function PageContainer({ children, size = "default", className = "" }) {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    wide: "max-w-screen-2xl",
    full: "w-full",
  };
  
  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </div>
  );
}
