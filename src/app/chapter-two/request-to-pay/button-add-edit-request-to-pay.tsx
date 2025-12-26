"use client";

import { useUserQuery } from "@/app/chapter-one/query";
import { Button, ButtonProps } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import FormAddEditRequestToPay from "../(components)/form-add-edit-request-to-pay";

interface ButtonAddEditRequestToPayProps extends ButtonProps {
  user: UserData | null;
}

export default function ButtonAddEditRequestToPay({
  user,
  ...props
}: ButtonAddEditRequestToPayProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useUserQuery(user!);
  return (
    <>
      <Button onClick={() => setOpen(true)} {...props} />
      <FormAddEditRequestToPay open={open} setOpen={setOpen} user={data!} />
    </>
  );
}
