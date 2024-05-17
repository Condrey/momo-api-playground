"use client";
import { Button } from "@/components/ui/button";
import {
  Home,
  CircleDashed,
  Star,
  Triangle,
  CircleSlash2,
  Box,
  DoorOpen,
  Code,
  Code2,
} from "lucide-react";
import { signIn } from "next-auth/react";

export default function NewComer() {
  return (
    <>
      <div className="flex size-[150px] items-center justify-center ">
        <Code2 className=" peer absolute z-50  size-[50px] text-amber-500 hover:animate-spin  hover:text-foreground dark:text-amber-300" />
        <CircleDashed className="absolute size-[90px] peer-hover:animate-spin peer-hover:text-amber-500 dark:peer-hover:text-amber-300" />
        <Star className="relative inset-12 animate-spin" />
        <Triangle className="relative -inset-12 animate-spin" />
        <CircleSlash2 className="relative inset-x-12 animate-spin" />
        <Box className="relative  -inset-y-12 animate-spin" />
      </div>
      <span className=" text-center text-2xl font-bold">WeLCoMe DeV BuDdY</span>
      <span className=" text-center">
        Sign in to continue testing out these cool resources.
      </span>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
