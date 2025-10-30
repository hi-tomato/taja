"use client";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "link";
  appName: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      appName,
      icon,
      size = "md",
      variant = "primary",
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeClass = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-6 py-4 text-lg",
    };

    const variantClass = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
      ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
      link: "text-blue-500 hover:text-blue-600 underline",
    };

    return (
      <button
        ref={ref}
        className={`disabled:cursor-not-allowed flex items-center justify-center gap-2 disabled:opacity-50 rounded-lg transition-colors font-medium ${sizeClass[size]} ${variantClass[variant]} ${className}`}
        onClick={() => alert(`Hello from your ${appName} app!`)}
        disabled={disabled}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
        )}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children && !loading && children}
      </button>
    );
  }
);

Button.displayName = "Button";
