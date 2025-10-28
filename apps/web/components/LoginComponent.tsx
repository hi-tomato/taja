"use client";
import React, { useState } from "react";
import { Button, InputField } from "./ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 폼 데이터 :", formData.email, formData.password);

    if (
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 로그인 로직 구현
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("로그인이 성공하였습니다.");
      router.push("/");
    } catch (error) {
      console.error("로그인 에러 :", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">로그인</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* 로고 및 제목 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">타</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              타자에 오신 것을 환영합니다
            </h2>
            <p className="text-gray-600">
              이메일과 비밀번호를 입력하여 로그인해주세요
            </p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이메일
                </label>
                <InputField
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={formData.email}
                  name="email"
                  onChange={handleFormChange}
                  variant="outline"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <InputField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    name="password"
                    onChange={handleFormChange}
                    variant="outline"
                    className="w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          {/* 추가 링크들 */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                아직 계정이 없으신가요?
              </span>
              <Link
                href="/signup"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
