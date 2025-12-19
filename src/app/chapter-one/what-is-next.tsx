"use client";

import ChapterLinks from "@/components/chapter-links";
import LoadingButton from "@/components/ui/loading-button";
import { resetUserVariables } from "@/lib/db/actions/primary-and-secondary-key-actions";
import { ServerMessage, cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
      
      toast( response.title!,{      
        description: response.message,
      });
    } catch (e) {
      toast.error("Server Error",{
        
        description: "Something is wrong with the server, please try again.!",
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
          ?
           " flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:p-4  "
          : "hidden",
      )}
    >
      <hr />
      <span>What is next?</span>
      <LoadingButton loading={isLoading} onClick={handleClick}>
        Re-Start drill
      </LoadingButton>
      <div className=" flex w-full items-center gap-2">
        <hr className=" flex grow" />
        <span>Or navigate to</span>
        <hr className=" flex grow" />
      </div>
      <div className="flex flex-col items-center gap-4 *:flex *:w-full *:max-w-prose *:gap-2 *:rounded-full *:px-4 *:py-2">
        <ChapterLinks />
      </div>
    </div>
  );
}
