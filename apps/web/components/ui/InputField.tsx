import React, { forwardRef, ReactNode } from "react";

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "unstyled";
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      error,
      icon,
      size = "md",
      variant = "outline",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClass = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const variantClass = {
      outline:
        "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      filled:
        "bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white",
      unstyled: "border-0 bg-transparent focus:outline-none",
    };

    return (
      <div className="w-full">
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className="relative">
          {icon && <span className="text-gray-500">{icon}</span>}
        </div>
        <input
          ref={ref}
          id={props.id}
          placeholder={placeholder}
          {...props}
          disabled={disabled}
          aria-invalid={!!error}
          className={`w-full transition-colors disabled:bg-gray-50 disabled:text-gray-500 ${sizeClass[size]} ${variantClass[variant]} ${className}`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
