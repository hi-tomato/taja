"use client";
import { Button, InputField } from "@/components/ui";
import { MyPageHeader } from "@/components/ui/mypage/MyPageHeader";
import { chatMessageMockData } from "@/constants/mock";
import { SendHorizonalIcon } from "lucide-react";
import React, { useState } from "react";

export const ChattingRoomContent = ({ id }: { id: string }) => {
  const [sendMessage, setSendMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(chatMessageMockData);

  const handleSendMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (sendMessage.trim()) {
      const newMessage = {
        messageId: Date.now(),
        chatRoomId: parseInt(id),
        senderId: 1,
        senderName: "홍길동",
        content: sendMessage.trim(),
        createdAt: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setSendMessage("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* 헤더 */}
      <MyPageHeader title={`채팅방 #${id}`} href="/chat" />

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 pt-20">
        {/* 메시지 목록 */}
        {chatMessages.map((message) => (
          <div
            key={message.messageId}
            className={`flex items-start gap-3 ${message.senderId === 1 ? "justify-end" : ""}`}
          >
            {message.senderId !== 1 && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 font-semibold text-white shadow-sm">
                {message.senderName.charAt(0)}
              </div>
            )}
            <div
              className={`flex max-w-[70%] flex-col gap-1 ${message.senderId === 1 ? "items-end" : ""}`}
            >
              {message.senderId !== 1 && (
                <span className="px-1 text-xs font-medium text-gray-600">
                  {message.senderName}
                </span>
              )}
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.senderId === 1
                    ? "rounded-tr-sm bg-linear-to-br from-blue-500 to-blue-600"
                    : "rounded-tl-sm border border-gray-100 bg-white"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    message.senderId === 1 ? "text-white" : "text-gray-800"
                  }`}
                >
                  {message.content}
                </p>
              </div>
              <span className="px-1 text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div className="safe-area-bottom border-t border-gray-200 bg-white px-4 py-3 shadow-lg">
        <div className="flex items-end gap-3">
          {/* 입력 필드 */}
          <div className="relative flex-1">
            <InputField
              placeholder="메시지를 입력하세요..."
              variant="filled"
              className="max-h-[120px] min-h-[44px] resize-none rounded-full pr-12"
              value={sendMessage}
              onChange={handleSendMessage}
            />
          </div>

          {/* 전송 버튼 */}
          <Button
            variant="primary"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-0"
            onClick={handleSendClick}
          >
            <SendHorizonalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
