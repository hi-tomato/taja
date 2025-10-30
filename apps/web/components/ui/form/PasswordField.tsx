import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputField } from "@/components/ui/base/InputField";
import { PasswordFieldProps } from "@/types/signup";

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  placeholder,
  error,
  helperText,
  showPassword,
  onToggleVisibility,
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
        <div className="relative">
          <InputField
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            variant="outline"
            className="w-full pr-12"
            {...props}
          />
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
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
