import React from "react";
import {
  SignupHeader,
  SignupHero,
  SignupForm,
  SignupFooter,
} from "@/components/signup";

export default function SignupComponentRefactored() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SignupHeader />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <SignupHero />
          <SignupForm />
          <SignupFooter />
        </div>
      </main>
    </div>
  );
}
