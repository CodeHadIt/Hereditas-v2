"use client";
import RainbowKitBtn from "@/components/common/rainbowKitBtn";
import ThemeSwitch from "@/components/header/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { Gift, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useMediaQuery } from "react-responsive";
import SideBar from "@/components/sidebar/SideBar";

const DashboardHeader = () => {
  const { isConnected, address, connector } = useAccount();
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const isBigScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <>
      <header className="sticky top-0 bg-background">
        <div className="flex justify-between items-center p-3 lg:p-6 border">
          <Link href="/" className="flex items-center gap-2">
            <Gift size={isBigScreen ? 40 : 35} />
            <div className="hidden lg:block text-2xl">Hereditas</div>
          </Link>
          <div className="flex items-center gap-3">
            {isBigScreen ? (
              <RainbowKitBtn />
            ) : (
              <RainbowKitBtn truncate={true} />
            )}
            <ThemeSwitch />
            {!isBigScreen &&
              (menuToggled ? (
                <div className="rounded-full p-2 bg-accent opacity-40 custom-hover hover:bg-background">
                  <X
                    className=""
                    onClick={() => setMenuToggled(false)}
                    size={30}
                  />
                </div>
              ) : (
                <div className="rounded-full p-2 bg-accent opacity-40 custom-hover hover:bg-background">
                  <Menu
                    className=""
                    onClick={() => setMenuToggled(true)}
                    size={30}
                  />
                </div>
              ))}
          </div>
        </div>
      </header>
      {menuToggled && (
        <div className="absolute top-0 w-full z-[1000] animate-menu-fade-in bg-transparent h-screen">
          <div
            className="w-full h-full bg-transparent"
            onClick={() => setMenuToggled(false)}
          ></div>
          <div className="absolute top-0 animate-menu-fade-in  flex flex-col gap-10  bg-background w-4/5  h-full py-3">
            <Link
              href="/"
              className="flex items-center gap-2 p-3 pb-4 border-b w-full"
            >
              <Gift size={isBigScreen ? 40 : 35} />
              <div className="text-2xl">Hereditas</div>
            </Link>
            <div className="p-3 pt-5 pb-48 w-full border-b">
              <SideBar />
            </div>
            <div className="p-3">
              <RainbowKitBtn />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
