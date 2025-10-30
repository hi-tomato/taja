import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileProps {
  user?: {
    id: number;
    name: string;
    email: string;
    imageUrl?: string;
  } | null;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="mb-2 bg-white p-6">
      {user ? (
        <div className="flex items-center gap-4">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="profile"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <User className="h-8 w-8 text-white" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            로그인이 필요합니다.
          </h2>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
