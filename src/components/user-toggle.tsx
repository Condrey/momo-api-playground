"use client";

import AddEditPrimaryAndSecondaryKeyForm from "@/app/chapter-one/add-edit-primary-and-secondary-key-form";
import { useUserQuery } from "@/app/chapter-one/query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/lib/types";
import { Key, User2, Variable } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
interface Props {
  user: UserData;
}
export default function UserToggle({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { data } = useUserQuery(user);
  const userImage = data?.image || undefined;
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          title="Click to view more"
          className="rounded-full"
          asChild
        >
          <Button variant="secondary" size="icon">
            <Avatar className="size-full">
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
              <AvatarImage src={userImage} alt="user image" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-12 min-w-50 space-y-2 p-4 *:space-x-2 *:px-2">
          {!!data && (
            <div className="flex items-center justify-center">
              <Avatar className="size-37.5">
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
                <AvatarImage src={userImage} alt="user image" />
              </Avatar>
            </div>
          )}
          <span className="font-bold">
            {data?.name || data?.email || "Unregistered User"}
          </span>
          <DropdownMenuSeparator />

          {!!data && (
            <>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Key /> <span>Primary & secondary Keys</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/my-variables")}>
                <Variable /> <span>All my variables</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem asChild>
            {data ? (
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            ) : (
              <Button className="w-full" onClick={() => signIn()}>
                Sign in
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddEditPrimaryAndSecondaryKeyForm
        open={open}
        setOpen={setOpen}
        user={data!}
      />
    </>
  );
}
