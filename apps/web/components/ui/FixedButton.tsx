import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./Button";

interface FixedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "link";
  disabled?: boolean;
  children?: ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}
export const FixedButton = ({
  children,
  position = "bottom-right",
  className,
  ...props
}: FixedButtonProps) => {
  return (
    <div className={`fixed ${position} ${className}`}>
      <Button {...props}>{children}</Button>
    </div>
  );
};
