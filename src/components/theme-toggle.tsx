"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, CheckCheck, Computer, Monitor, Moon, MoonIcon, Sun, SunIcon, Tv2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme,theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0 size-[50px]"
        >
          <SunIcon className=" size-[35px]  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <MoonIcon className="size-[35px] absolute   rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="*:flex *:gap-2 *:items-center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun/>  Light <Check className={cn(theme!=="light"&&"hidden")}/>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
         <Moon/> Dark  <Check className={cn(theme!=="dark"&&"hidden")}/>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor/> System <Check className={cn(theme!=="system"&&"hidden")}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
