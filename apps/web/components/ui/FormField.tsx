import React from "react";
import { InputField } from "./InputField";
import { FormFieldProps } from "../../types/signup";

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  error,
  helperText,
  rightButton,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <InputField
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            variant="outline"
            className="flex-1"
            {...props}
          />
          {rightButton}
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    </div>
  );
};
