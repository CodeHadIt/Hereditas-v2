'use client'
import React from 'react'
import { Gift } from "lucide-react";
import { Button } from '../ui/button';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import RainbowKitBtn from '../common/rainbowKitBtn';
import { useAccount } from 'wagmi';

const DesktopHeader = () => {
  const {isConnected, address, connector} = useAccount();
  // console.log({ isConnected, address, connector });
  return (
    <div className="hidden max-w-7xl mx-auto lg:flex justify-between items-center p-6">
      <Link href="/" className="flex items-center gap-2">
        <Gift size={40} />
        <div className="text-2xl">Hereditas</div>
      </Link>
      {!address && (
        <nav aria-label="desktop">
          <ul className="flex items-center gap-5 text-sm ">
            <li>
              <Link
                href="#testator"
                className="custom-hover hover:text-primary"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="#testator"
                className="custom-hover hover:text-primary"
              >
                As Testator
              </Link>
            </li>
            <li>
              <Link
                href="#beneficiary"
                className="custom-hover hover:text-primary"
              >
                As Beneficiary
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        {isConnected ? (
          <RainbowKitBtn />
        ) : (
          <Button asChild className="custom-scale custom-hover">
            <Link href="/app/dashboard">Launch App</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader