import { useState } from "react";
import { EmailVerifyStatus } from "@/types/signup";
import { VALIDATION_MESSAGES } from "@/constants/signup";

export const useEmailVerify = () => {
  const [verifyStatus, setVerifyStatus] = useState<EmailVerifyStatus>({
    isVerifying: false,
    isVerified: false,
    message: "",
  });

  const verifyEmail = async (email: string) => {
    if (!email) return;

    setVerifyStatus({
      isVerifying: true,
      isVerified: false,
      message: VALIDATION_MESSAGES.EMAIL.VERIFYING,
    });

    try {
      // TODO: 이메일 인증 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVerifyStatus({
        isVerifying: false,
        isVerified: true,
        message: VALIDATION_MESSAGES.EMAIL.SENT,
      });
    } catch (error) {
      setVerifyStatus({
        isVerifying: false,
        isVerified: false,
        message: VALIDATION_MESSAGES.EMAIL.ERROR,
      });
    }
  };

  const resetStatus = () => {
    setVerifyStatus({
      isVerifying: false,
      isVerified: false,
      message: "",
    });
  };

  return {
    verifyStatus,
    verifyEmail,
    resetStatus,
  };
};
