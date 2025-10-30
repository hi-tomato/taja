/**
 * 회원가입 관련 상수 정의
 */

import { z } from "zod";

// ===== 폼 검증 스키마 =====

export const SignupSchema = z
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

// ===== 폼 기본값 =====

export const SIGNUP_DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

// ===== 검증 메시지 =====

export const VALIDATION_MESSAGES = {
  NAME: {
    MIN_LENGTH: "이름은 2자 이상 입력해주세요.",
    CHECKING: "확인 중...",
    DUPLICATE: "이미 사용 중인 이름입니다",
    AVAILABLE: "사용 가능한 이름입니다",
    ERROR: "확인 중 오류가 발생했습니다",
  },
  EMAIL: {
    INVALID: "올바른 이메일 형식을 입력해주세요.",
    VERIFYING: "인증 중...",
    SENT: "인증 이메일을 발송했습니다. 이메일을 확인해주세요.",
    ERROR: "이메일 발송에 실패했습니다. 다시 시도해주세요.",
  },
  PASSWORD: {
    MIN_LENGTH: "비밀번호는 8자 이상 입력해주세요.",
    CONFIRM: "비밀번호를 다시 입력해주세요.",
    MISMATCH: "비밀번호가 일치하지 않습니다.",
    MATCH: "비밀번호가 일치합니다",
    HELPER: "8자 이상의 영문, 숫자, 특수문자 조합을 권장합니다",
  },
  TERMS: {
    REQUIRED: "이용약관에 동의해주세요.",
  },
} as const;

// ===== 버튼 텍스트 =====

export const BUTTON_TEXT = {
  NAME_CHECK: "중복 확인",
  NAME_CHECKING: "확인 중...",
  EMAIL_VERIFY: "인증",
  EMAIL_VERIFYING: "인증 중...",
  SIGNUP: "회원가입",
  SIGNUP_LOADING: "회원가입 중...",
  LOGIN: "로그인하기",
} as const;

// ===== 플레이스홀더 =====

export const PLACEHOLDERS = {
  NAME: "이름을 입력해주세요",
  EMAIL: "이메일을 입력해주세요",
  PASSWORD: "8자 이상 입력해주세요",
  CONFIRM_PASSWORD: "비밀번호를 다시 입력해주세요",
} as const;
