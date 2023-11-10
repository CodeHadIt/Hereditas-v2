
import React from 'react'
import DesktopHeader from "./DesktopHeader";
import MobileHeader from './MobileHeader';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-2xl bg-[rgba(229,231,235,0.7)] dark:bg-[rgba(255,255,255,.01)]">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}

export default Header