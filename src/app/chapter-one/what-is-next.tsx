"use client";

import ChapterLinks from "@/components/chapter-links";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { resetUserVariables } from "@/lib/db/actions/primary-and-secondary-key-actions";
import { ServerMessage, cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Props {
  user: User | null;
}
export default function WhatIsNext({ user }: Props) {
  const isApiKeyPresent = user?.apiKey !== null;
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  async function handleClick() {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
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
      <LoadingButton loading={isLoading} onClick={handleClick}>
        Re-Start drill
      </LoadingButton>
      <div className="flex flex-col gap-4 *:flex *:gap-2 *:rounded-full *:px-4 *:py-2">
        <div className=" flex w-full items-center gap-2">
          <hr className=" flex grow" />
          <span>Or navigate to</span>
          <hr className=" flex grow" />
        </div>
        <ChapterLinks />
      </div>
    </div>
  );
}
