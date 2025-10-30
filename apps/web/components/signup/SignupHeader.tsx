import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const SignupHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">회원가입</h1>
      </div>
    </header>
  );
};
