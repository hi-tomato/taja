import { useState } from "react";
import { NameCheckStatus } from "../types/signup";
import { VALIDATION_MESSAGES } from "../constants/signup";

export const useNameCheck = () => {
  const [checkStatus, setCheckStatus] = useState<NameCheckStatus>({
    isChecking: false,
    isValid: false,
    message: "",
  });

  const checkName = async (name: string) => {
    if (name.length < 2) return;

    setCheckStatus({
      isChecking: true,
      isValid: false,
      message: VALIDATION_MESSAGES.NAME.CHECKING,
    });

    try {
      // TODO: 실제 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isDuplicate = Math.random() > 0.5; // 임시 로직

      setCheckStatus({
        isChecking: false,
        isValid: !isDuplicate,
        message: isDuplicate
          ? VALIDATION_MESSAGES.NAME.DUPLICATE
          : VALIDATION_MESSAGES.NAME.AVAILABLE,
      });
    } catch (error) {
      setCheckStatus({
        isChecking: false,
        isValid: false,
        message: VALIDATION_MESSAGES.NAME.ERROR,
      });
    }
  };

  const resetStatus = () => {
    setCheckStatus({
      isChecking: false,
      isValid: false,
      message: "",
    });
  };

  return {
    checkStatus,
    checkName,
    resetStatus,
  };
};
