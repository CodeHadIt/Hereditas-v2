'use client'
import { Gift } from "lucide-react";
import Link from 'next/link';
import { Button } from '../ui/button';
import ThemeSwitch from './ThemeSwitch';

const DesktopHeader = () => {
  return (
    <div className="hidden max-w-7xl mx-auto lg:flex justify-between items-center p-6">
      <Link href="/" className="flex items-center gap-2">
        <Gift size={40} />
        <div className="text-2xl">Hereditas</div>
      </Link>
      <nav aria-label="desktop">
        <ul className="flex items-center gap-5 text-sm ">
          <li>
            <Link href="#testator" className="custom-hover hover:text-primary">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="#testator" className="custom-hover hover:text-primary">
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
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        <Button asChild className="custom-scale custom-hover">
          <Link href="/app/dashboard">Launch App</Link>
        </Button>
      </div>
    </div>
  );
};

export default DesktopHeader