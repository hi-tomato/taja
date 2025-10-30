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
      sm: "",
      md: "",
      lg: "",
    };

    const variantClass = {
      primary: "",
      secondary: "",
      ghost: "",
      link: "",
    };

    return (
      <button
        ref={ref}
        className={`disabled:cursor-not-allowed} flex w-full items-center justify-center gap-2 disabled:opacity-50 ${sizeClass[size]} ${variantClass[variant]} ${className}`}
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
