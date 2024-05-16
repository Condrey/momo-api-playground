"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function NewComer() {
  return (
    <>
      <span className=" text-2xl font-bold">Welcome Dev Newbie</span>
      <span>Sign in to start testing out these cool resources.</span>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
