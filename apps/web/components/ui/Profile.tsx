import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProfileProps {
  name?: string;
  email?: string;
  imageUrl?: string;
}

export default function Profile({ name, email, imageUrl = "" }: ProfileProps) {
  return (
    <div className="mb-2 bg-white p-6">
      <div className="flex items-center gap-4">
        {imageUrl ? (
          <Image src={imageUrl} alt="profile" width={64} height={64} />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            <User className="h-8 w-8 text-white" />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {name ?? "홍길동"}
          </h2>
          <p className="text-sm text-gray-500">{email ?? "hong@example.com"}</p>
        </div>
      </div>
    </div>
  );
}
