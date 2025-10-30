import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MyPageHeaderProps {
  title: string;
  href: string;
}

export const MyPageHeader = ({ title, href }: MyPageHeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link
          href={href}
          className="-ml-2 rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <button className="-mr-2 rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};
