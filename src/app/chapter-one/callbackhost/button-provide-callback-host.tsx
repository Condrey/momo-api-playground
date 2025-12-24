"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import FormAddEditCAllbackUrl from "./form-add-edit-callback-url";

interface ButtonProvideCallbackHostProps extends ButtonProps {
  user: UserData | null;
}

export default function ButtonProvideCallbackHost({
  user,
  ...props
}: ButtonProvideCallbackHostProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props} />
      <FormAddEditCAllbackUrl open={open} setOpen={setOpen} user={user!} />
    </>
  );
}
