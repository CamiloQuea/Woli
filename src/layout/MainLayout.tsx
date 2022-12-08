import { useSession } from "next-auth/react";
import React from "react";
import { InformationBanner } from "../components/InformationBanner";
import { HeroHome } from "../components/HeroBanner";
import { Navbar } from "../components/nav/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  secure?: boolean;
}

export const MainLayout = ({
  children,
  className,
  secure = false,
}: MainLayoutProps) => {
  const { status } = useSession();

  if (status === "loading") return <></>;

  return (
    <main className={`flex min-h-screen flex-col bg-neutral-50 ${className}`}>
      <Navbar />
      <div className="">
        {status === "authenticated" || !secure ? (
          children
        ) : (
          <div className="flex flex-grow flex-col ">
            <HeroHome />
            <InformationBanner />
          </div>
        )}
      </div>
    </main>
  );
};
