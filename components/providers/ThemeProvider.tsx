"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
type ProviderProps = {
  children: ReactNode;
};

const ThemeProviders = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviders;
