/**
 * 공통 타입 정의
 * @description 모든 API에서 공통으로 사용되는 타입들
 */

/**
 * 공통 에러 코드
 */
export type ErrorCode =
  | "INVALID_REQUEST"
  | "DUPLICATED"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "TOKEN_ERROR"
  | "FORBIDDEN"
  | "INTERNAL_SERVER_ERROR";

/**
 * 공통 성공 응답 구조
 */
export interface SuccessResponse<T = void> {
  code: "SUCCESS";
  message: string;
  data?: T;
}

/**
 * 공통 에러 응답 구조
 */
export interface ErrorResponse {
  code: ErrorCode;
  message: string;
}

/**
 * 페이지네이션 정보
 */
export interface PageInfo {
  /** 현재 페이지 */
  page: number;
  /** 페이지 크기 */
  size: number;
  /** 전체 요소 수 */
  totalElements: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 마지막 페이지 여부 */
  isLast: boolean;
}

// ===== Type Guards =====

/**
 * 성공 응답인지 확인
 */
export function isSuccessResponse<T>(
  response: SuccessResponse<T> | ErrorResponse
): response is SuccessResponse<T> {
  return response.code === "SUCCESS";
}

/**
 * 에러 응답인지 확인
 */
export function isErrorResponse(
  response: SuccessResponse<unknown> | ErrorResponse
): response is ErrorResponse {
  return response.code !== "SUCCESS";
}

/**
 * 토큰 에러인지 확인
 */
export function isTokenError(response: ErrorResponse): boolean {
  return response.code === "TOKEN_ERROR";
}

/**
 * 인증 에러인지 확인
 */
export function isUnauthorizedError(response: ErrorResponse): boolean {
  return response.code === "UNAUTHORIZED";
}

/**
 * 권한 에러인지 확인
 */
export function isForbiddenError(response: ErrorResponse): boolean {
  return response.code === "FORBIDDEN";
}

/**
 * Not Found 에러인지 확인
 */
export function isNotFoundError(response: ErrorResponse): boolean {
  return response.code === "NOT_FOUND";
}
