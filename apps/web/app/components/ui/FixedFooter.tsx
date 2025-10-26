import { BarChart, Map } from "lucide-react";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const CONTENT = {
  MAP: {
    title: "지도",
    icon: <Map />,
    href: "/map",
  },
  CHART: {
    title: "통계",
    icon: <BarChart />,
    href: "/chart",
  },
  MY: {
    title: "My",
    icon: <User />,
    href: "/my",
  },
};

export const FixedFooter = () => {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex justify-between px-4 py-2">
        {Object.values(CONTENT).map((content, index) => (
          <Link
            href={content.href as string}
            key={content.title + index}
            className="flex flex-col items-center justify-center rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
          >
            <div className="mb-1 text-xl">{content.icon}</div>
            <span className="text-xs font-medium text-gray-700">
              {content.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
