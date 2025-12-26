"use client";

import ChapterLinks from "@/components/chapter-links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useResetUserVariablesMutation } from "./mutations";
import { useUserQuery } from "./query";
interface Props {
  user: UserData | null;
}
export default function WhatIsNext({ user }: Props) {
  const { data } = useUserQuery(user!);
  const [open, setOpen] = useState(!!data?.momoVariable?.apiKey || false);
  const { mutate, isPending } = useResetUserVariablesMutation(data?.id!);

  async function handleClick() {
    mutate(data?.momoVariable?.id!);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay
        className={cn(
          "bg-transparent",
          open &&
            "from-primary to-mtn-blue bg-transparent bg-linear-to-bl/srgb via-transparent via-80%",
        )}
      >
        <DialogContent className="to-primary/10 bg-radial from-60% backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle>What is next?</DialogTitle>
            <DialogDescription>
              You have finished navigating all the drill for the Sandbox User
              Provisioning product
            </DialogDescription>
          </DialogHeader>
          <div
            className={cn(
              "flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:p-4",
            )}
          >
            <LoadingButton
              loading={isPending}
              onClick={handleClick}
              variant={"green"}
            >
              Re-Start drill
            </LoadingButton>
            <div className="flex w-full items-center gap-2">
              <hr className="flex grow" />
              <span>Or navigate to</span>
              <hr className="flex grow" />
            </div>
            <div className="flex flex-col items-center gap-4 *:flex *:w-full *:max-w-prose *:gap-2 *:rounded-full *:px-4 *:py-2">
              <ChapterLinks />
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
