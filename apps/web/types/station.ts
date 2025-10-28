/**
 * 대여소 상세 API 타입 정의
 * @description 대여소 상세 정보, 즐겨찾기 관련 API
 */

import { SuccessResponse, ErrorResponse } from "./common";

// ===== 1. 대여소 즐겨찾기 여부 조회 (로그인 필요) =====

/**
 * 즐겨찾기 여부 조회
 * @endpoint GET /stations/{stationId}/favorite
 * @requires Authentication
 */
export interface CheckFavoriteRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 즐겨찾기 여부 응답 데이터
 */
export interface FavoriteStatus {
  /** 즐겨찾기 여부 */
  isFavorite: boolean;
}

/**
 * 즐겨찾기 여부 조회 성공 응답
 */
export interface CheckFavoriteSuccessResponse
  extends SuccessResponse<FavoriteStatus> {
  message: "즐겨찾기 여부 조회에 성공했습니다.";
}

/**
 * 즐겨찾기 여부 조회 에러 응답
 */
export interface CheckFavoriteErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 대여소입니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 즐겨찾기 여부 조회 전체 응답
 */
export type CheckFavoriteResponse =
  | CheckFavoriteSuccessResponse
  | CheckFavoriteErrorResponse;

// ===== 2. 대여소 즐겨찾기 추가 (로그인 필요) =====

/**
 * 즐겨찾기 추가 요청
 * @endpoint POST /stations/{stationId}/favorite
 * @requires Authentication
 */
export interface AddFavoriteRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 즐겨찾기 추가 성공 응답
 */
export interface AddFavoriteSuccessResponse extends SuccessResponse {
  message: "즐겨찾기 추가에 성공했습니다.";
}

/**
 * 즐겨찾기 추가 에러 응답
 */
export interface AddFavoriteErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 대여소입니다."
    | "이미 즐겨찾기에 추가된 대여소입니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 즐겨찾기 추가 전체 응답
 */
export type AddFavoriteResponse =
  | AddFavoriteSuccessResponse
  | AddFavoriteErrorResponse;

// ===== 3. 대여소 즐겨찾기 제거 (로그인 필요) =====

/**
 * 즐겨찾기 제거 요청
 * @endpoint DELETE /stations/{stationId}/favorite
 * @requires Authentication
 */
export interface RemoveFavoriteRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 즐겨찾기 제거 성공 응답
 */
export interface RemoveFavoriteSuccessResponse extends SuccessResponse {
  message: "즐겨찾기 제거에 성공했습니다.";
}

/**
 * 즐겨찾기 제거 에러 응답
 */
export interface RemoveFavoriteErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 대여소입니다."
    | "즐겨찾기에 없는 대여소입니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 즐겨찾기 제거 전체 응답
 */
export type RemoveFavoriteResponse =
  | RemoveFavoriteSuccessResponse
  | RemoveFavoriteErrorResponse;

// ===== 4. 대여소 상세 정보 조회 =====

/**
 * 대여소 상세 정보 조회 요청
 * @endpoint GET /stations/{stationId}
 */
export interface StationDetailRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 대여소 상세 정보
 */
export interface StationDetailInfo {
  /** 대여소 ID */
  stationId: number;
  /** 대여소 번호 */
  number: number;
  /** 대여소 이름 */
  name: string;
  /** 대여소 위치 위도 */
  latitude: number;
  /** 대여소 위치 경도 */
  longitude: number;
  /** 대여소 주소 */
  address: string;
  /** 남은 자전거 수 */
  bikeCount: number;
  /** 총 거치대 수 */
  rackCount: number;
  /** 기준 시간 */
  requestedAt: string;
}

/**
 * 대여소 상세 정보 조회 성공 응답
 */
export interface StationDetailSuccessResponse
  extends SuccessResponse<StationDetailInfo> {
  message: "대여소 상세 정보 조회에 성공했습니다.";
}

/**
 * 대여소 상세 정보 조회 에러 응답
 */
export interface StationDetailErrorResponse extends ErrorResponse {
  message: "존재하지 않는 대여소입니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 대여소 상세 정보 조회 전체 응답
 */
export type StationDetailResponse =
  | StationDetailSuccessResponse
  | StationDetailErrorResponse;

// ===== 5. 실시간 남은 자전거 수 조회 =====

/**
 * 실시간 자전거 수 조회 요청
 * @endpoint GET /stations/status/{stationId}
 */
export interface BikeStatusRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 실시간 자전거 상태 정보
 */
export interface BikeStatusInfo {
  /** 대여소 ID */
  stationId: number;
  /** 남은 자전거 수 */
  bikeCount: number;
  /** 기준 시간 */
  requestedAt: string;
}

/**
 * 실시간 자전거 수 조회 성공 응답
 */
export interface BikeStatusSuccessResponse
  extends SuccessResponse<BikeStatusInfo> {
  message: "실시간 자전거 수 조회에 성공했습니다.";
}

/**
 * 실시간 자전거 수 조회 에러 응답
 */
export interface BikeStatusErrorResponse extends ErrorResponse {
  message: "존재하지 않는 대여소입니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 실시간 자전거 수 조회 전체 응답
 */
export type BikeStatusResponse =
  | BikeStatusSuccessResponse
  | BikeStatusErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts
