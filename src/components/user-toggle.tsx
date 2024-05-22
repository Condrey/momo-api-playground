"use client";

import AddEditPrimaryAndSecondaryKeyForm from "@/app/chapter-one/(components)/add-edit-primary-and-secondary-key-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Key, User2, Variable } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
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
  user: User | null;
}
export default function UserToggle({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userImage = user?.image || undefined;
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="ring-offset-3 size-[30px] md:size-[40px] xl:size-[50px] ring-1 ring-stone-700/20">
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
            <AvatarImage src={userImage} alt="user image" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-12 min-w-[200px] space-y-2 p-4 *:space-x-2  *:px-2">
          <div className="flex items-center justify-center">
            <Avatar className="size-[150px] ">
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
              <AvatarImage src={userImage} alt="user image" />
            </Avatar>
          </div>
          <span className="font-bold">
            {user?.name || user?.email || "Unregistered User"}
          </span>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Key /> <span>Primary & secondary Keys</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/my-variables")}>
            <Variable /> <span>All my variables</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            {user ? (
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
        user={user}
      />
    </>
  );
}
