/**
 * API 타입 정의 통합 Index
 * @description 모든 API 타입을 한 곳에서 import 가능
 */

// ===== Common Types (공통 타입) =====
export * from "./common";

// ===== Map API (지도) =====
export * from "./map";

// ===== Station API (대여소 상세) =====
export * from "./station";

// ===== Auth API (인증) =====
export * from "./auth";

// ===== Chat API (채팅) =====
export * from "./chat";

// ===== Notification API (알림) =====
export * from "./notification";

// ===== Statistics API (통계) =====
export * from "./status";

/**
 * @example
 * // 개별 import
 * import { NearbyStationsRequest, NearbyStationsResponse } from './types/map.types';
 * import { LoginRequest, LoginResponse } from './types/auth.types';
 *
 * // 통합 import
 * import {
 *   NearbyStationsRequest,
 *   LoginRequest,
 *   ChatMessage
 * } from './types';
 */
