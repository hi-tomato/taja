import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./Button";

interface FixedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "link";
  disabled?: boolean;
  children?: ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}
export const FixedButton = ({
  appName = "web",
  children,
  position = "bottom-right",
  className,
  ...props
}: FixedButtonProps) => {
  return (
    <div className={`fixed ${position} ${className}`}>
      <Button appName={appName} {...props}>
        {children}
      </Button>
    </div>
  );
};
