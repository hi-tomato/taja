/**
 * 알림 API 타입 정의
 * @description 알림 조회 및 읽음 처리
 */

import { SuccessResponse, ErrorResponse, PageInfo } from "./common";

/**
 * 알림 타입
 */
export type NotificationType =
  | "CHAT_MESSAGE" // 채팅 메시지
  | "FAVORITE_STATION" // 즐겨찾기 대여소 관련
  | "SYSTEM"; // 시스템 알림

// ===== 1. 알림 조회 =====

/**
 * 알림 조회 요청
 * @endpoint GET /notifications
 * @requires Authentication
 */
export interface GetNotificationsRequest {
  /** 페이지 번호 (기본값: 0) */
  page?: number;
  /** 페이지 크기 (기본값: 20) */
  size?: number;
  /** 읽지 않은 알림만 조회 여부 */
  unreadOnly?: boolean;
}

/**
 * 알림 정보
 */
export interface NotificationInfo {
  /** 알림 ID */
  notificationId: number;
  /** 알림 타입 */
  type: NotificationType;
  /** 알림 제목 */
  title: string;
  /** 알림 내용 */
  content: string;
  /** 읽음 여부 */
  isRead: boolean;
  /** 생성 시간 */
  createdAt: string;
  /** 관련 리소스 ID (옵션) */
  resourceId?: number;
  /** 관련 리소스 타입 (옵션) */
  resourceType?: string;
}

/**
 * 알림 목록
 */
export interface NotificationList {
  /** 알림 목록 */
  notifications: NotificationInfo[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 읽지 않은 알림 개수 */
  unreadCount: number;
}

/**
 * 알림 조회 성공 응답
 */
export interface GetNotificationsSuccessResponse
  extends SuccessResponse<NotificationList> {
  message: "알림 조회에 성공했습니다.";
}

/**
 * 알림 조회 에러 응답
 */
export interface GetNotificationsErrorResponse extends ErrorResponse {
  message: "액세스 토큰이 필요합니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 알림 조회 전체 응답
 */
export type GetNotificationsResponse =
  | GetNotificationsSuccessResponse
  | GetNotificationsErrorResponse;

// ===== 2. 알림 읽음 처리 =====

/**
 * 알림 읽음 처리 요청
 * @endpoint PATCH /notifications/{notificationId}
 * @requires Authentication
 */
export interface MarkNotificationReadRequest {
  /** 알림 ID */
  notificationId: number;
}

/**
 * 알림 읽음 처리 성공 응답
 */
export interface MarkNotificationReadSuccessResponse extends SuccessResponse {
  message: "알림 읽음 처리에 성공했습니다.";
}

/**
 * 알림 읽음 처리 에러 응답
 */
export interface MarkNotificationReadErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 알림입니다."
    | "본인의 알림만 읽음 처리할 수 있습니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 알림 읽음 처리 전체 응답
 */
export type MarkNotificationReadResponse =
  | MarkNotificationReadSuccessResponse
  | MarkNotificationReadErrorResponse;

// ===== 3. 모든 알림 읽음 처리 (옵션) =====

/**
 * 모든 알림 읽음 처리
 * @endpoint PATCH /notifications/read-all
 * @requires Authentication
 */
export interface MarkAllNotificationsReadSuccessResponse
  extends SuccessResponse {
  message: "모든 알림 읽음 처리에 성공했습니다.";
}

/**
 * 모든 알림 읽음 처리 에러 응답
 */
export interface MarkAllNotificationsReadErrorResponse extends ErrorResponse {
  message: "액세스 토큰이 필요합니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 모든 알림 읽음 처리 전체 응답
 */
export type MarkAllNotificationsReadResponse =
  | MarkAllNotificationsReadSuccessResponse
  | MarkAllNotificationsReadErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts

/**
 * 읽지 않은 알림인지 확인
 */
export function isUnreadNotification(notification: NotificationInfo): boolean {
  return !notification.isRead;
}

/**
 * 채팅 메시지 알림인지 확인
 */
export function isChatNotification(notification: NotificationInfo): boolean {
  return notification.type === "CHAT_MESSAGE";
}

/**
 * 시스템 알림인지 확인
 */
export function isSystemNotification(notification: NotificationInfo): boolean {
  return notification.type === "SYSTEM";
}
