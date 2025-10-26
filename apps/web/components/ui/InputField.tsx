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
      sm: "",
      md: "",
      lg: "",
    };

    const variantClass = {
      outline: "",
      filled: "",
      unstyled: "",
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
          className={`w-full ${sizeClass[size]} ${variantClass[variant]} ${className}`}
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
