/**
 * 인증(Auth) API 타입 정의
 * @description 회원가입, 로그인, 토큰 관리, 이메일 인증 등
 */

import { SuccessResponse, ErrorResponse } from "./common";

// ===== 1. 회원가입 =====

/**
 * 회원가입 요청
 * @endpoint POST /auth/signup
 */
export interface SignupRequest {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 이름 (닉네임) */
  name: string;
}

/**
 * 회원가입 성공 응답
 */
export interface SignupSuccessResponse extends SuccessResponse {
  message: "회원가입에 성공했습니다.";
}

/**
 * 회원가입 에러 응답
 */
export interface SignupErrorResponse extends ErrorResponse {
  message:
    | "이미 존재하는 이메일입니다."
    | "이미 존재하는 이름입니다."
    | "이메일 형식이 올바르지 않습니다."
    | "비밀번호는 8자 이상이어야 합니다."
    | "이름은 2자 이상 10자 이하이어야 합니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 회원가입 전체 응답
 */
export type SignupResponse = SignupSuccessResponse | SignupErrorResponse;

// ===== 2. 로그인 =====

/**
 * 로그인 요청
 * @endpoint POST /auth/login
 */
export interface LoginRequest {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 토큰 정보
 */
export interface TokenInfo {
  /** 액세스 토큰 */
  accessToken: string;
  /** 리프레시 토큰 */
  refreshToken: string;
}

/**
 * 로그인 성공 응답
 */
export interface LoginSuccessResponse extends SuccessResponse<TokenInfo> {
  message: "로그인에 성공했습니다.";
}

/**
 * 로그인 에러 응답
 */
export interface LoginErrorResponse extends ErrorResponse {
  message:
    | "이메일 또는 비밀번호가 일치하지 않습니다."
    | "이메일 형식이 올바르지 않습니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 로그인 전체 응답
 */
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

// ===== 3. 로그아웃 =====

/**
 * 로그아웃
 * @endpoint DELETE /auth/logout
 * @requires Authentication
 */
export interface LogoutSuccessResponse extends SuccessResponse {
  message: "로그아웃에 성공했습니다.";
}

/**
 * 로그아웃 에러 응답
 */
export interface LogoutErrorResponse extends ErrorResponse {
  message: "액세스 토큰이 필요합니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 로그아웃 전체 응답
 */
export type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse;

// ===== 4. 토큰 재발급 =====

/**
 * 토큰 재발급 요청
 * @endpoint POST /auth/token
 * @requires Authentication (Refresh Token)
 */
export interface RefreshTokenRequest {
  /** 리프레시 토큰 */
  refreshToken: string;
}

/**
 * 토큰 재발급 성공 응답
 */
export interface RefreshTokenSuccessResponse
  extends SuccessResponse<TokenInfo> {
  message: "토큰 재발급에 성공했습니다.";
}

/**
 * 토큰 재발급 에러 응답
 */
export interface RefreshTokenErrorResponse extends ErrorResponse {
  message:
    | "리프레시 토큰이 유효하지 않습니다."
    | "리프레시 토큰이 만료되었습니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 토큰 재발급 전체 응답
 */
export type RefreshTokenResponse =
  | RefreshTokenSuccessResponse
  | RefreshTokenErrorResponse;

// ===== 5. 이메일 인증 요청 =====

/**
 * 이메일 인증 요청
 * @endpoint POST /auth/email/send
 */
export interface SendEmailVerificationRequest {
  /** 이메일 */
  email: string;
}

/**
 * 이메일 인증 요청 성공 응답
 */
export interface SendEmailVerificationSuccessResponse extends SuccessResponse {
  message: "인증 이메일이 전송되었습니다.";
}

/**
 * 이메일 인증 요청 에러 응답
 */
export interface SendEmailVerificationErrorResponse extends ErrorResponse {
  message:
    | "이메일 형식이 올바르지 않습니다."
    | "이미 인증된 이메일입니다."
    | "이메일 전송에 실패했습니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 이메일 인증 요청 전체 응답
 */
export type SendEmailVerificationResponse =
  | SendEmailVerificationSuccessResponse
  | SendEmailVerificationErrorResponse;

// ===== 6. 이메일 인증 검사 =====

/**
 * 이메일 인증 검사 요청
 * @endpoint POST /auth/email/verify
 */
export interface VerifyEmailRequest {
  /** 이메일 */
  email: string;
  /** 인증 코드 */
  code: string;
}

/**
 * 이메일 인증 검사 성공 응답
 */
export interface VerifyEmailSuccessResponse extends SuccessResponse {
  message: "이메일 인증에 성공했습니다.";
}

/**
 * 이메일 인증 검사 에러 응답
 */
export interface VerifyEmailErrorResponse extends ErrorResponse {
  message:
    | "인증 코드가 일치하지 않습니다."
    | "인증 코드가 만료되었습니다."
    | "이메일 형식이 올바르지 않습니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 이메일 인증 검사 전체 응답
 */
export type VerifyEmailResponse =
  | VerifyEmailSuccessResponse
  | VerifyEmailErrorResponse;

// ===== 7. 이름 중복 확인 =====

/**
 * 이름 중복 확인 요청
 * @endpoint POST /auth/name/duplicate-check
 */
export interface CheckNameDuplicateRequest {
  /** 이름 (닉네임) */
  name: string;
}

/**
 * 중복 확인 결과
 */
export interface DuplicateCheckResult {
  /** 중복 여부 */
  isDuplicated: boolean;
}

/**
 * 이름 중복 확인 성공 응답
 */
export interface CheckNameDuplicateSuccessResponse
  extends SuccessResponse<DuplicateCheckResult> {
  message: "이름 중복 확인에 성공했습니다.";
}

/**
 * 이름 중복 확인 에러 응답
 */
export interface CheckNameDuplicateErrorResponse extends ErrorResponse {
  message:
    | "이름은 2자 이상 10자 이하이어야 합니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 이름 중복 확인 전체 응답
 */
export type CheckNameDuplicateResponse =
  | CheckNameDuplicateSuccessResponse
  | CheckNameDuplicateErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts
