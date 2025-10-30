import React from "react";

export const SignupHero = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">타</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        타자와 함께 시작하세요
      </h2>
      <p className="text-gray-600">
        간단한 정보 입력으로 회원가입을 완료하세요
      </p>
    </div>
  );
};
