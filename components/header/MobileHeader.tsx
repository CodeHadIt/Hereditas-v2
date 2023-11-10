'use client'
import Link from 'next/link';
import { Gift, Menu, X, CalendarCheck2, HeartHandshake } from "lucide-react";
import ThemeSwitch from './ThemeSwitch';
import { useState } from 'react';
import { Button } from '../ui/button';

const MobileHeader = () => {
    const [menuToggled, setMenuToggled] = useState<boolean>(false);
  return (
    <div
      className={`lg:hidden w-full absolute bg-inherit ${
        menuToggled && "!bg-background min-h-screen flex flex-col gap-6"
      }`}
    >
      <div className="flex items-center justify-between p-3 w-full">
        <Link href="/" className="flex items-center gap-2">
          <Gift size={35} />
          <div className="text-xl">Hereditas</div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          {menuToggled ? (
            <div className="rounded-full p-2 bg-accent opacity-40 custom-hover hover:bg-background">
              <X className="" onClick={() => setMenuToggled(false)} size={30} />
            </div>
          ) : (
            <div className="rounded-full p-2 bg-accent opacity-40 custom-hover hover:bg-background">
              <Menu
                className=""
                onClick={() => setMenuToggled(true)}
                size={30}
              />
            </div>
          )}
        </div>
      </div>
      {menuToggled && (
        <div className="animate-menu-fade-in p-3 w-full space-y-6">
          <nav aria-label="mobile">
            <ul className="flex flex-col items-start gap-5 text-lg ">
              <li>
                <Link
                  href="#how"
                  className="custom-hover hover:text-primary"
                  onClick={() => setMenuToggled(false)}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#testator"
                  className="custom-hover hover:text-primary"
                  onClick={() => setMenuToggled(false)}
                >
                  As Testator
                </Link>
              </li>
              <li>
                <Link
                  href="#beneficiary"
                  className="custom-hover hover:text-primary"
                  onClick={() => setMenuToggled(false)}
                >
                  As Beneficiary
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            asChild
            className="w-full custom-scale custom-hover p-6 text-lg"
          >
            <Link href="/app/dashboard" onClick={() => setMenuToggled(false)}>
              Launch App
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default MobileHeader