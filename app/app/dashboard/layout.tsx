import SideBar from "@/components/sidebar/SideBar";
import BeneficiaryContextProvider from "@/context/BeneficiaryContext";
import GiftContextProvider from "@/context/GiftContext";
import DashboardHeader from "./_components/header";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Create and Claim digital assets with Hereditas",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto border-4">
      <GiftContextProvider>
        <BeneficiaryContextProvider>
          <DashboardHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen py-24 px-6">
            <section className="hidden lg:block">
              <SideBar />
            </section>
            <section className="lg:col-span-2 flex flex-col gap-9 max-w-4xl text-center">
              {children}
            </section>
          </div>
        </BeneficiaryContextProvider>
      </GiftContextProvider>
    </section>
  );
}
