import BreadCrumb from "@/components/bread-crumb";
import EmptyContainer from "@/components/query-containers/empty-container";
import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { differenceInMilliseconds, formatDate } from "date-fns";
import {
  Box,
  BoxIcon,
  CircleDashed,
  CircleDashedIcon,
  CircleSlash2,
  CircleSlash2Icon,
  Star,
  StarIcon,
  Stars,
  Triangle,
  TriangleIcon,
  User2,
  VariableIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { fetchUserById } from "../chapter-one/actions";

export const metadata: Metadata = {
  title: "My Variables",
  description:
    "List of all my variables including x-reference-id, apiKey, authorization, and many others",
};

export default async function Page() {
  const user = await fetchUserById();
  if (!user) return <EmptyContainer message={"Please sign in first"} />;
  const { momoVariable, image } = user;
  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "My variables", href: "/my-variables" },
        ]}
      />

      <div className="flex flex-col gap-6 *:flex *:w-full *:flex-col *:gap-4 lg:flex-row">
        <div className="w-full items-center lg:w-1/3">
          <Avatar className="size-37.5 rounded-full">
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
            <AvatarImage src={image!} alt="user-image" />
          </Avatar>
          <span>My Variables</span>
          <div className="hidden size-37.5 items-center justify-center lg:flex">
            <VariableIcon className="peer hover:text-foreground text-primary absolute z-50 size-12.5 animate-spin" />
            <CircleDashedIcon className="text-mtn-blue peer-hover:text-primary absolute size-22.5 peer-hover:animate-spin" />
            <StarIcon className="text-mtn-blue relative inset-12 peer-hover:animate-spin" />
            <TriangleIcon className="text-mtn-blue relative -inset-12 peer-hover:animate-spin" />
            <CircleSlash2Icon className="text-mtn-blue relative inset-x-12 peer-hover:animate-spin" />
            <BoxIcon className="text-mtn-blue relative -inset-y-12 peer-hover:animate-spin" />
          </div>
        </div>
        <div className="rounded-md border p-4">
          {!!momoVariable ? (
            <div className="grid gap-4 *:max-w-prose sm:grid-cols-2">
              {Object.entries(momoVariable).map(([key, val]) => {
                if (val == null) return null;
                if (val instanceof Date) {
                  const expiresMs =
                    3600 * 1000 - differenceInMilliseconds(new Date(), val);

                  return (
                    <SmallCodeSnippetContainer
                      key={key}
                      text={formatDate(val, "PPPpp")}
                      title={`Your ${key}`}
                      subtitle={
                        expiresMs <= 0
                          ? "Expired"
                          : `expires in ${expiresMs} ms`
                      }
                    />
                  );
                }
                const display =
                  typeof val === "object" ? JSON.stringify(val) : String(val);
                return (
                  <SmallCodeSnippetContainer
                    key={key}
                    text={display}
                    title={`Your ${key}`}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyContainer
              message={
                "Seems you have nothing.! You need to get started with Sandbox user provisioning ASAP.!"
              }
            >
              <div
                className={cn(
                  "flex size-full flex-col items-center justify-center gap-4",
                )}
              >
                <div className="flex size-37.5 items-center justify-center">
                  <Stars className="peer hover:text-foreground text-primary absolute z-50 size-12.5" />
                  <CircleDashed className="peer-hover:text-primary text-mtn-blue absolute size-22.5 peer-hover:animate-spin" />
                  <Star className="text-mtn-blue relative inset-12 peer-hover:animate-spin" />
                  <Triangle className="text-mtn-blue relative -inset-12 peer-hover:animate-spin" />
                  <CircleSlash2 className="text-mtn-blue relative inset-x-12 peer-hover:animate-spin" />
                  <Box className="text-mtn-blue relative -inset-y-12 peer-hover:animate-spin" />
                </div>

                <Link href="/chapter-one" className={cn(buttonVariants())}>
                  Get started
                </Link>
              </div>
            </EmptyContainer>
          )}
        </div>
      </div>
    </>
  );
}
