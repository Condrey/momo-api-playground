"use client";

import ResponseContainer from "@/components/response-container";
import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { UserData } from "@/lib/types";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { useCreateApiUserMutation } from "../mutations";

interface ButtonCreateApiUserProps extends ButtonProps {
  user: UserData | null;
}

export default function ButtonCreateApiUser({
  user,
  children,
  ...props
}: ButtonCreateApiUserProps) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const disableButton =
    !user?.momoVariable?.callbackUrl || !!user?.momoVariable?.referenceId;
  if (!user) {
    throw new Error("Unauthenticated user");
  }
  const { isPending, mutate } = useCreateApiUserMutation(user?.id);

  async function handleClick() {
    mutate(undefined, {
      async onSuccess(response) {
        const returnedMessage = await response.json();
        setResponseMsg(
          JSON.stringify({
            returnedMessage,
            status: response.status,
            statusText: response.statusText,
          }),
        );
      },
    });
  }
  return (
    <>
      <LoadingButton
        disabled={disableButton}
        onClick={handleClick}
        loading={isPending}
        variant={disableButton ? "secondary" : "default"}
        {...props}
      >
        {disableButton && (
          <CheckCircleIcon className="mr-2 inline" strokeWidth={0.8} />
        )}{" "}
        {children}
      </LoadingButton>
      <ResponseContainer message={responseMsg} filePath="Server response" />
    </>
  );
}
