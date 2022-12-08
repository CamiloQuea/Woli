
import React from "react";
import { Navbar } from "../components/nav/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children,className }: MainLayoutProps) => {
  return (
    <main className={`min-h-screen bg-neutral-100 flex flex-col ${className}`}>
      <Navbar />
      {children}
    </main>
  );
};
