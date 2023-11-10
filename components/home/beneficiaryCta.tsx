"use client";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import beneficiaryDark from "@/public/images/beneficiary_claim.png";
import beneficiaryLight from "@/public/images/beneficiary_light.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const BeneficiaryCta = () => {
  const { theme } = useTheme();
  return (
    <section
      id="beneficiary"
      className="pt-20 flex flex-col gap-9 items-center max-w-4xl text-center overflow-hidden "
    >
      <div className="space-y-4">
        <h2 className="text-4xl opacity-90">Use as a Beneficiary</h2>
        <p className="text-paragraph max-w-2xl mx-auto">
          {`Use Hereditas today to claim gifts from family, friends and others in a seamlessly`}
        </p>
      </div>

      <Card className="border-2 flex flex-col-reverse md:flex-row justify-between gap-10">
        {theme === "dark" ? (
          <Image
            src={beneficiaryDark}
            alt="testator_create_gift"
            className="h-full object-contain rounded-bl-md md:rounded-tl-md rounded-br-md md:rounded-br-none w-full md:max-w-[400px]"
          />
        ) : (
          <Image
            src={beneficiaryLight}
            alt="testator_create_gift"
            className="h-full object-contain rounded-bl-md md:rounded-tl-md rounded-br-md md:rounded-br-none w-full md:max-w-[400px]"
          />
        )}

        <div className="p-8 text-left space-y-5 max-w-xl">
          <div className="space-y-3">
            <h3 className="text-2xl">Recieve Any Type of Asset</h3>
            <p className="text-paragraph text-sm">
              You can be gifted Ethereum and it will be available for claim on
              the specified date.
            </p>
            <p className="text-paragraph text-sm">
              {`Claim that Nft/digital art collection you've been an admirer of.`}
            </p>
            <p className="text-paragraph text-sm">
              You can also recieve assets other than Ether and Nfts with our
              ERC20 token options.
            </p>
          </div>

          <Button asChild className="custom-scale custom-hover">
            <Link href="/app/dashboard">Launch as Beneficiary</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default BeneficiaryCta;
