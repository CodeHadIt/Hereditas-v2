"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const handleThemeSwitch = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <Card>
        <Button variant="outline" size="icon" onClick={handleThemeSwitch}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    </Card>
  );
}

export default ThemeSwitch;
