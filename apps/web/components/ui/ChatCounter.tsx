import React from "react";

export default function ChatCounter({ count }: { count: number }) {
  return (
    <div className="flex-shrink-0 min-w-[20px] h-5 px-2 bg-red-500 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">
        {count > 99 ? "99+" : count}
      </span>
    </div>
  );
}
