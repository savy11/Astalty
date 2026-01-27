"use client";
import Image from "next/image";

export default function SignupForm() {
  return (
    <div className="w-full h-[800px] flex items-center justify-center bg-gray-100">
      <Image
        src="/images/bannerhospital.svg"
        alt="Centered"
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
}
