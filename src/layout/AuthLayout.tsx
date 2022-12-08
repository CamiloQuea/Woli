import React from "react";
import Logo from "../components/icons/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="inset-0 min-h-screen flex items-center justify-center h-full absolute bg-gradient-to-r from-blue-400 to-blue-500  p-5">
      <div className="  flex h-full tallmedium:h-[600px]  flex-col rounded bg-white shadow-lg w-[1200px] md:flex-row">
        <div className="hidden tallmedium:flex  grow  items-center justify-center overflow-hidden rounded-l bg-gradient-to-br w-full from-blue-400 to-indigo-500  md:w-4/6">
          <Logo className="hidden w-3/4 bg-cover bg-center items-center justify-center text-white md:flex" />
          <p className="block px-5 text-[8rem] text-white xs:text-[10rem] md:hidden">
            woli
          </p>
        </div>


        <div className="relative w-full p-5 md:w-1/2 my-auto">{children}</div>


      </div>
    </div>
  );
};
