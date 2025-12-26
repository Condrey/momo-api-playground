"use client";

import ResponseContainer from "@/components/response-container";
import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { UserData } from "@/lib/types";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { useCreateAccessTokenMutation } from "../mutation";

interface ButtonCreateAccessTokenProps extends ButtonProps {
  user: UserData | null;
}

export default function ButtonCreateAccessToken({
  user,
  children,
  ...props
}: ButtonCreateAccessTokenProps) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const isAccessTokenGot = !!user?.momoVariable?.accessToken;
  if (!user) {
    throw new Error("Unauthenticated user");
  }
  const { isPending, mutate } = useCreateAccessTokenMutation(user?.id);

  async function handleClick() {
    mutate(undefined, {
      async onSuccess(response) {
        const returnedMessage = await response.json();
        setResponseMsg(
          JSON.stringify(
            {
              status: response.status,
              statusText: response.statusText,
              returnedMessage,
            },
            null,
            2,
          ),
        );
      },
    });
  }
  return (
    <>
      <LoadingButton
        onClick={handleClick}
        loading={isPending}
        variant={isAccessTokenGot ? "green" : "default"}
        {...props}
      >
        {isAccessTokenGot && !isPending && (
          <CheckCircleIcon className="mr-2 inline" strokeWidth={0.8} />
        )}{" "}
        {children}
      </LoadingButton>
      <ResponseContainer message={responseMsg} filePath="Server response" />
    </>
  );
}
