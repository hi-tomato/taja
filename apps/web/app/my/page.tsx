import { LogOut, MessageCircle, Moon, Settings } from "lucide-react";
import React from "react";
import Profile from "@/components/ui/Profile";
import MyPageHeader from "@/components/ui/MyPageHeader";
import MyPageMenuItem from "@/components/ui/MyPageMenuItem";

const menuItems = [
  { icon: <MessageCircle className="h-5 w-5" />, label: "참여한 채팅방" },
  { icon: <Moon className="h-5 w-5" />, label: "테마 설정" },
  { icon: <Settings className="h-5 w-5" />, label: "정보 수정" },
  { icon: <LogOut className="h-5 w-5" />, label: "로그아웃" },
];

export default function MyPageScreen() {
  const user = {
    id: 1,
    name: "홍길동",
    email: "honggildong@example.com",
    imageUrl: "",
  };
  const isLoggedOut = false;

  return (
    <div className="min-h-screen bg-gray-50">
      <MyPageHeader />

      <main className="mx-auto max-w-md pt-16 pb-20">
        {user ? (
          <>
            <Profile user={user} />
            {!isLoggedOut &&
              menuItems.map((item) => (
                <MyPageMenuItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
          </>
        ) : (
          <Profile user={null} />
        )}
      </main>
    </div>
  );
}
