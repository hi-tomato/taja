import React from "react";
import { Check } from "lucide-react";
import { NameCheckFieldProps } from "@/types/signup";
import { BUTTON_TEXT, PLACEHOLDERS } from "@/constants/signup";
import { Button } from "@/components/ui/base/Button";
import { FormField } from "@/components/ui/form/FormField";

export const NameCheckField: React.FC<NameCheckFieldProps> = ({
  value,
  error,
  checkStatus,
  onCheck,
  onValueChange,
  className,
}) => {
  const isButtonDisabled = value.length < 2 || checkStatus.isChecking;

  return (
    <div className={className}>
      <FormField
        label="이름(닉네임)"
        id="name"
        type="text"
        placeholder={PLACEHOLDERS.NAME}
        value={value}
        onChange={onValueChange}
        error={error}
        rightButton={
          <Button
            type="button"
            variant="secondary"
            onClick={onCheck}
            disabled={isButtonDisabled}
            className="px-4"
          >
            {checkStatus.isChecking
              ? BUTTON_TEXT.NAME_CHECKING
              : BUTTON_TEXT.NAME_CHECK}
          </Button>
        }
      />
      {checkStatus.message && !error && (
        <p
          className={`text-xs flex items-center gap-1 mt-1 ${
            checkStatus.isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {checkStatus.isValid && <Check className="h-3 w-3" />}
          {checkStatus.message}
        </p>
      )}
    </div>
  );
};
