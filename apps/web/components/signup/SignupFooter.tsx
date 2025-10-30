import React from "react";
import Link from "next/link";
import { BUTTON_TEXT } from "@/constants/signup";

export const SignupFooter: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
      <Link
        href="/login"
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {BUTTON_TEXT.LOGIN}
      </Link>
    </div>
  );
};
