/**
 * 지도 API 타입 정의
 * @description 지도 관련 API (대여소 조회, 검색, 즐겨찾기)
 */

import { SuccessResponse, ErrorResponse } from "./common";

// ===== 1. 내 위치 주변 대여소 조회 =====

/**
 * 주변 대여소 조회 요청
 * @endpoint /stations/map/nearby
 * @method GET
 */
export interface NearbyStationsRequest {
  /** 사용자 위치 위도 (-90 ~ 90) */
  latitude: number;
  /** 사용자 위치 경도 (-90 ~ 90) */
  longitude: number;
  /** 지도 위도 변화량 (50%, 0 이상) */
  latDelta: number;
  /** 지도 경도 변화량 (50%, 0 이상) */
  lonDelta: number;
}

/**
 * 대여소 정보 (기본)
 */
export interface StationBasicInfo {
  /** 대여소 ID */
  stationId: number;
  /** 대여소 번호 */
  number: number;
  /** 대여소 위치 위도 */
  latitude: number;
  /** 대여소 위치 경도 */
  longitude: number;
  /** 남은 자전거 수 */
  bikeCount: number;
  /** 기준 시간 */
  requestedAt: string;
}

/**
 * 주변 대여소 조회 성공 응답
 */
export interface NearbyStationsSuccessResponse
  extends SuccessResponse<StationBasicInfo[]> {
  message: "근처 대여소 조회에 성공했습니다.";
}

/**
 * 주변 대여소 조회 에러 메시지
 */
export type NearbyStationsErrorMessage =
  | "latitude는 90 이하이어야 합니다."
  | "latitude는 -90 이상이어야 합니다."
  | "longitude는 90 이하이어야 합니다."
  | "longitude는 -90 이상이어야 합니다."
  | "latDelta는 0 이상이어야 합니다."
  | "lonDelta는 0 이상이어야 합니다."
  | "서버 내부 오류가 발생했습니다.";

/**
 * 주변 대여소 조회 에러 응답
 */
export interface NearbyStationsErrorResponse extends ErrorResponse {
  message: NearbyStationsErrorMessage;
}

/**
 * 주변 대여소 조회 전체 응답
 */
export type NearbyStationsResponse =
  | NearbyStationsSuccessResponse
  | NearbyStationsErrorResponse;

// ===== 2. 즐겨찾기 대여소 조회 (로그인 필요) =====

/**
 * 즐겨찾기 대여소 조회
 * @endpoint /stations/map/favorites
 * @method GET
 * @requires Authentication
 */
export interface FavoriteStationsSuccessResponse
  extends SuccessResponse<StationBasicInfo[]> {
  message: "즐겨찾기 대여소 조회에 성공했습니다.";
}

/**
 * 즐겨찾기 대여소 조회 에러 메시지
 */
export type FavoriteStationsErrorMessage =
  | "액세스 토큰이 필요합니다."
  | "서버 내부 오류가 발생했습니다.";

/**
 * 즐겨찾기 대여소 조회 에러 응답
 */
export interface FavoriteStationsErrorResponse extends ErrorResponse {
  message: FavoriteStationsErrorMessage;
}

/**
 * 즐겨찾기 대여소 조회 전체 응답
 */
export type FavoriteStationsResponse =
  | FavoriteStationsSuccessResponse
  | FavoriteStationsErrorResponse;

// ===== 3. 대여소명 검색 =====

/**
 * 대여소 검색 요청
 * @endpoint /stations/map/search
 * @method GET
 */
export interface SearchStationsRequest {
  /** 검색어 (대여소 이름) */
  name: string;
  /** 사용자 위치 위도 */
  latitude?: number;
  /** 사용자 위치 경도 */
  longitude?: number;
}

/**
 * 검색된 대여소 정보 (거리 포함)
 */
export interface SearchedStationInfo {
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
  /** 사용자로부터의 거리 (미터) */
  distance: number;
}

/**
 * 대여소 검색 성공 응답
 */
export interface SearchStationsSuccessResponse
  extends SuccessResponse<SearchedStationInfo[]> {
  message: "대여소 검색에 성공했습니다.";
}

/**
 * 대여소 검색 에러 메시지
 */
export type SearchStationsErrorMessage =
  | "위도는 90 이하이어야 합니다."
  | "위도는 -90 이상이어야 합니다."
  | "경도는 90 이하이어야 합니다."
  | "경도는 -90 이상이어야 합니다."
  | "서버 내부 오류가 발생했습니다.";

/**
 * 대여소 검색 에러 응답
 */
export interface SearchStationsErrorResponse extends ErrorResponse {
  message: SearchStationsErrorMessage;
}

/**
 * 대여소 검색 전체 응답
 */
export type SearchStationsResponse =
  | SearchStationsSuccessResponse
  | SearchStationsErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts
