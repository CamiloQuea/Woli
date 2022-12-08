import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleLoginProps {
    className?: string;
}

export const GoogleLogin = ({className}:GoogleLoginProps) => {
  return (
    <div
      className={`flex cursor-pointer select-none items-center space-x-2 rounded-xl border px-4 py-2 shadow-md hover:bg-neutral-50 w-fit ${className}`}
      onClick={() => signIn("google")}
    >
      <FcGoogle />
      <div className="text-sm font-medium hidden md:block">Continuar con Google</div>
    </div>
  );
};
