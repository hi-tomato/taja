import React from "react";

interface MyPageMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function MyPageMenuItem({
  icon,
  label,
  onClick,
}: MyPageMenuItemProps) {
  return (
    <div className="bg-white">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
      </button>
    </div>
  );
}
