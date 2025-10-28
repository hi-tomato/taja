import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData } from "../types/signup";
import { SignupSchema, SIGNUP_DEFAULT_VALUES } from "../constants/signup";

export const useSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    defaultValues: SIGNUP_DEFAULT_VALUES,
  });

  const { handleSubmit, watch, setValue } = methods;
  const watchedValues = watch();

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // TODO: 회원가입 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("회원가입이 완료되었습니다!");
      return { success: true };
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    methods,
    handleSubmit,
    watchedValues,
    isLoading,
    showPassword,
    showConfirmPassword,
    onSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setValue,
  };
};
