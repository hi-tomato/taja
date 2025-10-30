import { ChatRoomInfo, ChatMessage } from "@/types";

// 유저 데이터
export const user = {
  id: 1,
  name: "홍길동",
  email: "honggildong@example.com",
  imageUrl: "",
};

// 채팅방 목록 데이터 (ChatRoomInfo 타입)
export const chatMockData: ChatRoomInfo[] = [
  {
    chatRoomId: 1,
    stationId: 101,
    stationName: "오목교역 3번 출구",
  },
  {
    chatRoomId: 2,
    stationId: 102,
    stationName: "신촌역 2번 출구",
  },
  {
    chatRoomId: 3,
    stationId: 103,
    stationName: "홍대입구역 9번 출구",
  },
];

// 채팅방 메시지 데이터 (ChatMessage 타입)
export const chatMessageMockData: ChatMessage[] = [
  {
    messageId: 1,
    chatRoomId: 1,
    senderId: 2,
    senderName: "김철수",
    content: "여기 자전거 남아있나요?",
    createdAt: "2025-10-28T14:30:00.000Z",
  },
  {
    messageId: 2,
    chatRoomId: 1,
    senderId: 3,
    senderName: "이영희",
    content:
      "혹시 이 대여소 근처에 자전거 반납하기 좋은 곳 있나요? 처음 와봐서 잘 모르겠네요 ㅠㅠ",
    createdAt: "2025-10-28T14:35:00.000Z",
  },
  {
    messageId: 3,
    chatRoomId: 1,
    senderId: 1,
    senderName: "홍길동",
    content: "네, 방금 확인했는데 3대 있습니다!",
    createdAt: "2025-10-28T14:31:00.000Z",
  },
  {
    messageId: 4,
    chatRoomId: 1,
    senderId: 1,
    senderName: "홍길동",
    content: "저도 여기 자주 이용해요",
    createdAt: "2025-10-28T14:36:00.000Z",
  },
  {
    messageId: 5,
    chatRoomId: 1,
    senderId: 1,
    senderName: "홍길동",
    content: "바로 옆 건물 앞에 반납하기 좋은 대여소 있어요!",
    createdAt: "2025-10-28T14:36:30.000Z",
  },
  {
    messageId: 6,
    chatRoomId: 1,
    senderId: 1,
    senderName: "홍길동",
    content: "도움이 되셨으면 좋겠네요 😊",
    createdAt: "2025-10-28T14:37:00.000Z",
  },
];
