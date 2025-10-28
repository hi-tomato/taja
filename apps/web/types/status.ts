/**
 * 대여소별 이용 통계 API 타입 정의
 * @description 대여소 이용 통계 조회 및 검색
 */

import { SuccessResponse, ErrorResponse, PageInfo } from "./common";

/**
 * 통계 기간 타입
 */
export type StatsPeriod = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

// ===== 1. 대여소별 이용 통계 조회 =====

/**
 * 대여소 통계 조회 요청
 * @endpoint GET /stations/stats/{stationId}
 */
export interface StationStatsRequest {
  /** 대여소 ID */
  stationId: number;
  /** 통계 기간 (기본값: DAILY) */
  period?: StatsPeriod;
  /** 시작 날짜 (YYYY-MM-DD) */
  startDate?: string;
  /** 종료 날짜 (YYYY-MM-DD) */
  endDate?: string;
}

/**
 * 시간대별 이용 통계
 */
export interface HourlyStats {
  /** 시간 (0-23) */
  hour: number;
  /** 대여 횟수 */
  rentalCount: number;
  /** 반납 횟수 */
  returnCount: number;
}

/**
 * 일별 이용 통계
 */
export interface DailyStats {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 대여 횟수 */
  rentalCount: number;
  /** 반납 횟수 */
  returnCount: number;
  /** 평균 이용 시간 (분) */
  avgUsageMinutes: number;
}

/**
 * 대여소 이용 통계 정보
 */
export interface StationStatsInfo {
  /** 대여소 ID */
  stationId: number;
  /** 대여소 이름 */
  stationName: string;
  /** 통계 기간 */
  period: StatsPeriod;
  /** 시작 날짜 */
  startDate: string;
  /** 종료 날짜 */
  endDate: string;
  /** 총 대여 횟수 */
  totalRentalCount: number;
  /** 총 반납 횟수 */
  totalReturnCount: number;
  /** 평균 이용 시간 (분) */
  avgUsageMinutes: number;
  /** 시간대별 통계 */
  hourlyStats?: HourlyStats[];
  /** 일별 통계 */
  dailyStats?: DailyStats[];
}

/**
 * 대여소 통계 조회 성공 응답
 */
export interface StationStatsSuccessResponse
  extends SuccessResponse<StationStatsInfo> {
  message: "대여소 통계 조회에 성공했습니다.";
}

/**
 * 대여소 통계 조회 에러 응답
 */
export interface StationStatsErrorResponse extends ErrorResponse {
  message:
    | "존재하지 않는 대여소입니다."
    | "날짜 형식이 올바르지 않습니다."
    | "시작 날짜는 종료 날짜보다 이전이어야 합니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 대여소 통계 조회 전체 응답
 */
export type StationStatsResponse =
  | StationStatsSuccessResponse
  | StationStatsErrorResponse;

// ===== 2. 전체 대여소 리스트 조회 =====

/**
 * 전체 대여소 목록 조회 요청
 * @endpoint GET /stations/stats
 */
export interface AllStationsStatsRequest {
  /** 페이지 번호 (기본값: 0) */
  page?: number;
  /** 페이지 크기 (기본값: 20) */
  size?: number;
  /** 정렬 기준 (rentalCount, name 등) */
  sortBy?: "rentalCount" | "returnCount" | "name" | "number";
  /** 정렬 방향 (asc, desc) */
  sortDirection?: "asc" | "desc";
}

/**
 * 대여소 요약 통계
 */
export interface StationSummaryStats {
  /** 대여소 ID */
  stationId: number;
  /** 대여소 번호 */
  number: number;
  /** 대여소 이름 */
  name: string;
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
  /** 총 대여 횟수 */
  totalRentalCount: number;
  /** 총 반납 횟수 */
  totalReturnCount: number;
  /** 현재 자전거 수 */
  currentBikeCount: number;
}

/**
 * 대여소 목록 통계
 */
export interface AllStationsStatsList {
  /** 대여소 목록 */
  stations: StationSummaryStats[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
}

/**
 * 전체 대여소 목록 조회 성공 응답
 */
export interface AllStationsStatsSuccessResponse
  extends SuccessResponse<AllStationsStatsList> {
  message: "전체 대여소 목록 조회에 성공했습니다.";
}

/**
 * 전체 대여소 목록 조회 에러 응답
 */
export interface AllStationsStatsErrorResponse extends ErrorResponse {
  message: "잘못된 페이지 번호입니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 전체 대여소 목록 조회 전체 응답
 */
export type AllStationsStatsResponse =
  | AllStationsStatsSuccessResponse
  | AllStationsStatsErrorResponse;

// ===== 3. 대여소명 검색 (통계) =====

/**
 * 대여소 검색 요청 (통계)
 * @endpoint GET /stations/stats/search
 */
export interface SearchStationsStatsRequest {
  /** 검색어 (대여소 이름) */
  name: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}

/**
 * 대여소 검색 통계 성공 응답
 */
export interface SearchStationsStatsSuccessResponse
  extends SuccessResponse<AllStationsStatsList> {
  message: "대여소 검색에 성공했습니다.";
}

/**
 * 대여소 검색 통계 에러 응답
 */
export interface SearchStationsStatsErrorResponse extends ErrorResponse {
  message: "검색어는 1자 이상이어야 합니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 대여소 검색 통계 전체 응답
 */
export type SearchStationsStatsResponse =
  | SearchStationsStatsSuccessResponse
  | SearchStationsStatsErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts

/**
 * 대여 횟수로 정렬 여부 확인
 */
export function isSortedByRental(sortBy?: string): boolean {
  return sortBy === "rentalCount";
}

/**
 * 반납 횟수로 정렬 여부 확인
 */
export function isSortedByReturn(sortBy?: string): boolean {
  return sortBy === "returnCount";
}
