import React from "react";
import { FormProvider } from "react-hook-form";
import { Check } from "lucide-react";
import { NameCheckField } from "./NameCheckField";
import { EmailVerifyField } from "./EmailVerifyField";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useNameCheck } from "@/hooks/useNameCheck";
import { useEmailVerify } from "@/hooks/useEmailVerify";
import { SignupFormData } from "@/types/signup";
import { BUTTON_TEXT, VALIDATION_MESSAGES } from "@/constants/signup";
import { Button } from "@/components/ui/base/Button";
import { PasswordField } from "@/components/ui/form/PasswordField";

export const SignupForm: React.FC = () => {
  const {
    methods,
    handleSubmit,
    watchedValues,
    isLoading,
    showPassword,
    showConfirmPassword,
    onSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useSignupForm();

  const { checkStatus, checkName } = useNameCheck();
  const { verifyStatus, verifyEmail } = useEmailVerify();

  const handleNameCheck = () => {
    checkName(watchedValues.name);
  };

  const handleEmailVerify = () => {
    verifyEmail(watchedValues.email);
  };

  const handleFormSubmit = async (data: SignupFormData) => {
    const result = await onSubmit(data);
    if (result?.success) {
      // 성공 시 로그인 페이지로 이동하는 로직은 상위 컴포넌트에서 처리
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* 이름 필드 */}
        <NameCheckField
          value={watchedValues.name}
          error={methods.formState.errors.name?.message}
          checkStatus={checkStatus}
          onCheck={handleNameCheck}
          onValueChange={(value) => methods.setValue("name", value)}
        />

        {/* 이메일 필드 */}
        <EmailVerifyField
          value={watchedValues.email}
          error={methods.formState.errors.email?.message}
          verifyStatus={verifyStatus}
          onVerify={handleEmailVerify}
          onValueChange={(value) => methods.setValue("email", value)}
        />

        {/* 비밀번호 필드 */}
        <PasswordField
          label="비밀번호"
          id="password"
          placeholder={VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH}
          error={methods.formState.errors.password?.message}
          helperText={VALIDATION_MESSAGES.PASSWORD.HELPER}
          showPassword={showPassword}
          onToggleVisibility={togglePasswordVisibility}
          value={watchedValues.password}
          onChange={(value) => methods.setValue("password", value)}
        />

        {/* 비밀번호 확인 필드 */}
        <PasswordField
          label="비밀번호 확인"
          id="confirmPassword"
          placeholder="비밀번호를 다시 입력해주세요"
          error={methods.formState.errors.confirmPassword?.message}
          showPassword={showConfirmPassword}
          onToggleVisibility={toggleConfirmPasswordVisibility}
          value={watchedValues.confirmPassword}
          onChange={(value) => methods.setValue("confirmPassword", value)}
        />

        {/* 비밀번호 일치 확인 메시지 */}
        {watchedValues.confirmPassword &&
          watchedValues.password === watchedValues.confirmPassword &&
          !methods.formState.errors.confirmPassword && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Check className="h-3 w-3" />
              {VALIDATION_MESSAGES.PASSWORD.MATCH}
            </p>
          )}

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? BUTTON_TEXT.SIGNUP_LOADING : BUTTON_TEXT.SIGNUP}
        </Button>
      </form>
    </FormProvider>
  );
};
