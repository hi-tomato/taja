"use client";
import React, { useState } from "react";
import { Button, InputField } from "./ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyPageHeader from "./ui/MyPageHeader";

const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: "이름은 2자 이상 입력해주세요." }),
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상 입력해주세요." }),
    confirmPassword: z
      .string()
      .min(8, { message: "비밀번호를 다시 입력해주세요." }),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function SignupComponent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameCheckStatus, setNameCheckStatus] = useState<{
    isChecking: boolean;
    isValid: boolean;
    message: string;
  }>({ isChecking: false, isValid: false, message: "" });

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const { handleSubmit, watch } = methods;
  const watchedValues = watch();

  const handleNameCheck = async () => {
    const name = watchedValues.name;
    if (name.length < 2) return;

    setNameCheckStatus({
      isChecking: true,
      isValid: false,
      message: "확인 중...",
    });

    try {
      // TODO: 실제 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isDuplicate = Math.random() > 0.5; // 임시 로직

      setNameCheckStatus({
        isChecking: false,
        isValid: !isDuplicate,
        message: isDuplicate
          ? "이미 사용 중인 이름입니다"
          : "사용 가능한 이름입니다",
      });
    } catch {
      setNameCheckStatus({
        isChecking: false,
        isValid: false,
        message: "확인 중 오류가 발생했습니다",
      });
    }
  };

  const handleEmailVerify = async () => {
    const email = watchedValues.email;
    if (!email) return;

    try {
      // TODO: 이메일 인증 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("인증 이메일을 발송했습니다. 이메일을 확인해주세요.");
    } catch {
      alert("이메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: 회원가입 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } catch {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <MyPageHeader title="회원가입" href={"/"} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* 로고 및 제목 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">타</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              타자와 함께 시작하세요
            </h2>
            <p className="text-gray-600">
              간단한 정보 입력으로 회원가입을 완료하세요
            </p>
          </div>

          {/* 회원가입 폼 */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 이름 필드 */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이름(닉네임)
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <InputField
                      id="name"
                      type="text"
                      placeholder="이름을 입력해주세요"
                      {...methods.register("name")}
                      variant="outline"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleNameCheck}
                      disabled={
                        watchedValues.name?.length < 2 ||
                        nameCheckStatus.isChecking
                      }
                      className="px-4"
                    >
                      {nameCheckStatus.isChecking ? "확인 중..." : "중복 확인"}
                    </Button>
                  </div>
                  {methods.formState.errors.name && (
                    <p className="text-xs text-red-600">
                      {methods.formState.errors.name.message}
                    </p>
                  )}
                  {nameCheckStatus.message &&
                    !methods.formState.errors.name && (
                      <p
                        className={`text-xs flex items-center gap-1 ${
                          nameCheckStatus.isValid
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {nameCheckStatus.isValid && (
                          <Check className="h-3 w-3" />
                        )}
                        {nameCheckStatus.message}
                      </p>
                    )}
                </div>
              </div>

              {/* 이메일 필드 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이메일
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <InputField
                      id="email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      {...methods.register("email")}
                      variant="outline"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleEmailVerify}
                      disabled={!watchedValues.email}
                      className="px-4"
                    >
                      인증
                    </Button>
                  </div>
                  {methods.formState.errors.email && (
                    <p className="text-xs text-red-600">
                      {methods.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 비밀번호 필드 */}
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
                    placeholder="8자 이상 입력해주세요"
                    {...methods.register("password")}
                    variant="outline"
                    className="w-full pr-12"
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
                {methods.formState.errors.password && (
                  <p className="text-xs text-red-600 mt-1">
                    {methods.formState.errors.password.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  8자 이상의 영문, 숫자, 특수문자 조합을 권장합니다
                </p>
              </div>

              {/* 비밀번호 확인 필드 */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  비밀번호 확인
                </label>
                <div className="relative">
                  <InputField
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    {...methods.register("confirmPassword")}
                    variant="outline"
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {methods.formState.errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">
                    {methods.formState.errors.confirmPassword.message}
                  </p>
                )}
                {watchedValues.confirmPassword &&
                  watchedValues.password === watchedValues.confirmPassword &&
                  !methods.formState.errors.confirmPassword && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      비밀번호가 일치합니다
                    </p>
                  )}
              </div>

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
              </Button>
            </form>
          </FormProvider>

          {/* 로그인 링크 */}
          <div className="mt-8 text-center">
            <span className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
