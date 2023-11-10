"use client";
import React from "react";
import RainbowKitBtn from "@/components/common/rainbowKitBtn";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const ConnectWalletPage = () => {
  const router = useRouter();
  const { address } = useAccount();

  address && router.push("/app/dashboard/home");

  return (
    <section>
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6">
        <RainbowKitBtn label="Connect Wallet" />
        <p className="text-sm text-paragraph">
          Connect Your create and view gifts.
        </p>
      </div>
    </section>
  );
};

export default ConnectWalletPage;
