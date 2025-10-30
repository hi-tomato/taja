/**
 * 회원가입 관련 타입 정의
 */

// ===== 폼 데이터 타입 =====

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

// ===== 이름 중복 확인 상태 =====

export interface NameCheckStatus {
  isChecking: boolean;
  isValid: boolean;
  message: string;
}

// ===== 이메일 인증 상태 =====

export interface EmailVerifyStatus {
  isVerifying: boolean;
  isVerified: boolean;
  message: string;
}

// ===== 비밀번호 검증 상태 =====

export interface PasswordValidationStatus {
  isValid: boolean;
  message: string;
}

// ===== 폼 필드 에러 =====

export interface FormFieldError {
  message: string;
  type?: string;
}

// ===== 컴포넌트 Props 타입 =====

export interface FormFieldProps {
  label: string;
  id: string;
  type: "text" | "email";
  placeholder: string;
  error?: string;
  helperText?: string;
  rightButton?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface PasswordFieldProps {
  label: string;
  id: string;
  placeholder: string;
  error?: string;
  helperText?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface NameCheckFieldProps {
  value: string;
  error?: string;
  checkStatus: NameCheckStatus;
  onCheck: () => void;
  onValueChange: (value: string) => void;
  className?: string;
}

export interface EmailVerifyFieldProps {
  value: string;
  error?: string;
  verifyStatus: EmailVerifyStatus;
  onVerify: () => void;
  onValueChange: (value: string) => void;
  className?: string;
}
