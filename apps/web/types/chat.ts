/**
 * 채팅 API 타입 정의
 * @description 대여소 채팅방 참여, 메시지 조회/전송
 */

import { SuccessResponse, ErrorResponse, PageInfo } from "./common";

// ===== 1. 대여소 채팅 참여하기 =====

/**
 * 채팅 참여 요청
 * @endpoint POST /stations/{stationId}/chat
 * @requires Authentication
 */
export interface JoinChatRequest {
  /** 대여소 ID */
  stationId: number;
}

/**
 * 채팅방 정보
 */
export interface ChatRoomInfo {
  /** 채팅방 ID */
  chatRoomId: number;
  /** 대여소 ID */
  stationId: number;
  /** 대여소 이름 */
  stationName: string;
}

/**
 * 채팅 참여 성공 응답
 */
export interface JoinChatSuccessResponse extends SuccessResponse<ChatRoomInfo> {
  message: "채팅방 참여에 성공했습니다.";
}

/**
 * 채팅 참여 에러 응답
 */
export interface JoinChatErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 대여소입니다."
    | "이미 참여한 채팅방입니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 채팅 참여 전체 응답
 */
export type JoinChatResponse = JoinChatSuccessResponse | JoinChatErrorResponse;

// ===== 2. 채팅방 메시지 조회 =====

/**
 * 채팅방 메시지 조회 요청
 * @endpoint GET /chatrooms/{chatRoomId}
 * @requires Authentication
 */
export interface GetMessagesRequest {
  /** 채팅방 ID */
  chatRoomId: number;
  /** 페이지 번호 (기본값: 0) */
  page?: number;
  /** 페이지 크기 (기본값: 20) */
  size?: number;
}

/**
 * 채팅 메시지 정보
 */
export interface ChatMessage {
  /** 메시지 ID */
  messageId: number;
  /** 채팅방 ID */
  chatRoomId: number;
  /** 발신자 ID */
  senderId: number;
  /** 발신자 이름 */
  senderName: string;
  /** 메시지 내용 */
  content: string;
  /** 전송 시간 */
  createdAt: string;
}

/**
 * 채팅 메시지 목록
 */
export interface ChatMessageList {
  /** 메시지 목록 */
  messages: ChatMessage[];
  /** 페이지 정보 */
  pageInfo: PageInfo;
}

/**
 * 메시지 조회 성공 응답
 */
export interface GetMessagesSuccessResponse
  extends SuccessResponse<ChatMessageList> {
  message: "채팅 메시지 조회에 성공했습니다.";
}

/**
 * 메시지 조회 에러 응답
 */
export interface GetMessagesErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 채팅방입니다."
    | "채팅방에 참여하지 않은 사용자입니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 메시지 조회 전체 응답
 */
export type GetMessagesResponse =
  | GetMessagesSuccessResponse
  | GetMessagesErrorResponse;

// ===== 3. 채팅방 메시지 전송 =====

/**
 * 메시지 전송 요청
 * @endpoint POST /chatrooms/{chatRoomId}
 * @requires Authentication
 */
export interface SendMessageRequest {
  /** 채팅방 ID */
  chatRoomId: number;
  /** 메시지 내용 */
  content: string;
}

/**
 * 메시지 전송 성공 응답
 */
export interface SendMessageSuccessResponse
  extends SuccessResponse<ChatMessage> {
  message: "메시지 전송에 성공했습니다.";
}

/**
 * 메시지 전송 에러 응답
 */
export interface SendMessageErrorResponse extends ErrorResponse {
  message:
    | "액세스 토큰이 필요합니다."
    | "존재하지 않는 채팅방입니다."
    | "채팅방에 참여하지 않은 사용자입니다."
    | "메시지 내용은 1자 이상 500자 이하이어야 합니다."
    | "서버 내부 오류가 발생했습니다.";
}

/**
 * 메시지 전송 전체 응답
 */
export type SendMessageResponse =
  | SendMessageSuccessResponse
  | SendMessageErrorResponse;

// ===== 4. 참여한 채팅방 리스트 조회 =====

/**
 * 참여 채팅방 목록 조회
 * @endpoint GET /member/chatrooms
 * @requires Authentication
 */
export interface MyChatRoomsSuccessResponse
  extends SuccessResponse<ChatRoomInfo[]> {
  message: "참여한 채팅방 목록 조회에 성공했습니다.";
}

/**
 * 참여 채팅방 목록 조회 에러 응답
 */
export interface MyChatRoomsErrorResponse extends ErrorResponse {
  message: "액세스 토큰이 필요합니다." | "서버 내부 오류가 발생했습니다.";
}

/**
 * 참여 채팅방 목록 조회 전체 응답
 */
export type MyChatRoomsResponse =
  | MyChatRoomsSuccessResponse
  | MyChatRoomsErrorResponse;

// ===== Type Guards =====
// Type guards are imported from common.ts
