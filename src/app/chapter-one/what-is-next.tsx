"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { resetUserVariables } from "@/lib/db/actions/primary-and-secondary-key-actions";
import { ServerMessage, cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
interface Props {
  user: User | null;
}
export default function WhatIsNext({ user }: Props) {
  const isApiKeyPresent = user?.apiKey !== null;

  const router = useRouter();
  async function handleClick() {
    try {
      const response: ServerMessage = await resetUserVariables();
      toast({
        title: response.title!,
        description: response.message,
        variant: response.type === "error" ? "destructive" : "default",
      });
    } catch (e) {
      toast({
        title: "Server Error",
        description: "Something is wrong with the server, please try again.!",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  }
  return (
    <div
      className={cn(
        isApiKeyPresent
          ? " flex w-full flex-col gap-4 p-4 *:before:pr-2 *:before:text-2xl *:before:font-bold  "
          : "hidden",
      )}
    >
      <hr />
      <span>What is next?</span>
      <Button onClick={handleClick}>Re-Start drill</Button>
    </div>
  );
}
