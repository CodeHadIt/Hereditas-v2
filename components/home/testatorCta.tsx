'use client'
import React from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import testatorDark from "@/public/images/testator_create.png"
import testatorLight from "@/public/images/testator_light.png"
import Image from 'next/image';
import { useTheme } from 'next-themes';

const TestatorCta = () => {
  const {theme} = useTheme();
  return (
    <section
      id="testator"
      className="pt-20 flex flex-col gap-9 items-center max-w-4xl text-center overflow-hidden "
    >
      <div className="space-y-4">
        <h2 className="text-4xl opacity-90">Use as a Testator</h2>
        <p className="text-paragraph max-w-2xl mx-auto">
          {`Explore our protocol today by creating a gift for your friends, family
          and favourite DAO's`}
        </p>
      </div>

      <Card className="border-2 flex flex-col md:flex-row justify-between gap-10">
        <div className="p-8 text-left space-y-5 max-w-xl">
          <div className="space-y-3">
            <h3 className="text-2xl">Create Multiple Gift Type</h3>
            <p className="text-paragraph text-sm">
              You can gift Ethereum to anyone of your choosing and have them
              claim said Ethereum at a specified time
            </p>
            <p className="text-paragraph text-sm">
              Gift your favourite digital arts and collectibles to anyone
              onchain
            </p>
            <p className="text-paragraph text-sm">
              You can also explore the option of gifting any token on the
              Ethereum blockchain as well
            </p>
          </div>

          <Button asChild className="custom-scale custom-hover">
            <Link href="/app/dashboard">Launch as Testator</Link>
          </Button>
        </div>

        {theme === "dark" ? (
          <Image
            src={testatorDark}
            alt="testator_create_gift"
            className="h-full object-contain rounded-bl-md md:rounded-bl-none md:rounded-tr-md rounded-br-md w-full md:max-w-[400px]"
          />
        ) : (
          <Image
            src={testatorLight}
            alt="testator_create_gift"
            className="h-full object-contain rounded-bl-md md:rounded-bl-none md:rounded-tr-md rounded-br-md w-full md:max-w-[400px]"
          />
        )}
      </Card>
    </section>
  );
}

export default TestatorCta