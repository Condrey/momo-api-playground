import BreadCrumb from "@/components/bread-crumb";
import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { fetchUserById } from "@/lib/db/data/user-data";
import { cn } from "@/lib/utils";
import {
  Box,
  CircleDashed,
  CircleSlash2,
  Star,
  Stars,
  Triangle,
  User2,
  Variable,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Variables",
  description:
    "List of all my variables including x-reference-id, apiKey, authorization, and many others",
};

export default async function Page() {
  const user = await fetchUserById();
  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "My variables", href: "/my-variables" },
        ]}
      />

      <div className="flex flex-col gap-6 *:flex *:w-full *:flex-col *:gap-4 lg:flex-row">
        <div className="w-full items-center  lg:w-1/3">
          <Avatar className="size-[150px] rounded-full ">
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
            <AvatarImage src={user?.image!} alt="user-image" />
          </Avatar>
          <span>My Variables</span>
          <div className="hidden size-[150px] items-center justify-center lg:flex ">
            <Variable className=" peer absolute z-50  size-[50px] animate-spin text-amber-500 hover:text-foreground dark:text-amber-300" />
            <CircleDashed className="absolute size-[90px] peer-hover:animate-spin peer-hover:text-amber-500 dark:peer-hover:text-amber-300" />
            <Star className="relative inset-12 peer-hover:animate-spin" />
            <Triangle className="relative -inset-12 peer-hover:animate-spin" />
            <CircleSlash2 className="relative inset-x-12 peer-hover:animate-spin" />
            <Box className="relative  -inset-y-12 peer-hover:animate-spin" />
          </div>
        </div>
        <div className="rounded-md border p-4 *:max-w-prose">
          {/**
           *
           * chapter one
           *
           *
           */}
          <SmallCodeSnippetContainer
            text={user?.callbackHost!}
            title="Your callbackHost"
          />
          <SmallCodeSnippetContainer
            text={user?.callbackUrl!}
            title="Your callbackUrl"
          />
          <SmallCodeSnippetContainer
            text={user?.referenceId!}
            title="Your X-Reference-Id"
          />
          <SmallCodeSnippetContainer text={user?.apiKey!} title="Your apiKey" />
          <SmallCodeSnippetContainer
            text={user?.authorization!}
            title="Your Authorization"
            subtitle="Please note, authorization expires in 1 hour"
          />
          <hr />
          {/**
           *
           * chapter two
           *
           *
           */}
          <SmallCodeSnippetContainer
            text={user?.accessToken!}
            title="Your accessToken"
          />
          <div
            className={cn(
              user?.referenceId !== null
                ? "hidden"
                : "flex size-full flex-col items-center justify-center gap-4 ",
            )}
          >
            <div className="flex size-[150px] items-center justify-center ">
              <Stars className=" peer absolute z-50  size-[50px]  text-amber-500 hover:text-foreground dark:text-amber-300" />
              <CircleDashed className="absolute size-[90px] peer-hover:animate-spin peer-hover:text-amber-500 dark:peer-hover:text-amber-300" />
              <Star className="relative inset-12 peer-hover:animate-spin" />
              <Triangle className="relative -inset-12 peer-hover:animate-spin" />
              <CircleSlash2 className="relative inset-x-12 peer-hover:animate-spin" />
              <Box className="relative  -inset-y-12 peer-hover:animate-spin" />
            </div>
            <span>Seems you have nothing.!</span>
            <span>
              You need to get started with Sandbox user provisioning ASAP.!
            </span>
            <Link
              href="/chapter-one"
              className={cn(
                buttonVariants({
                  className:
                    "bg-amber-500 hover:bg-amber-300 dark:bg-amber-300 dark:hover:bg-amber-500",
                }),
              )}
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
