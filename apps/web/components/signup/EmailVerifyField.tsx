import React from "react";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";
import { EmailVerifyFieldProps } from "../../types/signup";
import { BUTTON_TEXT, PLACEHOLDERS } from "../../constants/signup";

export const EmailVerifyField: React.FC<EmailVerifyFieldProps> = ({
  value,
  error,
  verifyStatus,
  onVerify,
  onValueChange,
  className,
}) => {
  const isButtonDisabled = !value || verifyStatus.isVerifying;

  return (
    <div className={className}>
      <FormField
        label="이메일"
        id="email"
        type="email"
        placeholder={PLACEHOLDERS.EMAIL}
        value={value}
        onChange={onValueChange}
        error={error}
        rightButton={
          <Button
            type="button"
            variant="secondary"
            onClick={onVerify}
            disabled={isButtonDisabled}
            className="px-4"
          >
            {verifyStatus.isVerifying
              ? BUTTON_TEXT.EMAIL_VERIFYING
              : BUTTON_TEXT.EMAIL_VERIFY}
          </Button>
        }
      />
      {verifyStatus.message && !error && (
        <p
          className={`text-xs mt-1 ${
            verifyStatus.isVerified ? "text-green-600" : "text-blue-600"
          }`}
        >
          {verifyStatus.message}
        </p>
      )}
    </div>
  );
};
