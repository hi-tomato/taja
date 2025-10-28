import ChatCounter from "@/components/ui/ChatCounter";
import MyPageHeader from "@/components/ui/MyPageHeader";
import { chatMockData } from "@/constant/mock";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MyPageHeader title="채팅" href="/" />
      <main className="mx-auto max-w-md pt-16">
        <section className="bg-white">
          {chatMockData.length > 0 ? (
            chatMockData.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="flex items-center gap-4 border-b border-gray-100 px-4 py-4 transition-colors hover:bg-gray-50"
              >
                {/* Avatar */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h2 className="truncate text-base font-semibold text-gray-900">
                      {chat.title}
                    </h2>
                  </div>
                  <p className="truncate text-sm text-gray-600">
                    {chat.description}
                  </p>
                </div>

                {/* Unread Counter */}
                {chat.count > 0 && <ChatCounter count={chat.count} />}
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-20">
              <MessageCircle className="mb-4 h-16 w-16 text-gray-300" />
              <p className="text-center text-gray-500">아직 채팅이 없습니다</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
