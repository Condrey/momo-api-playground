"use client";

import ResponseContainer from "@/components/response-container";
import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { UserData } from "@/lib/types";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { useCreateApiKeyMutation } from "../mutations";

interface ButtonCreateApiKeyProps extends ButtonProps {
  user: UserData | null;
}

export default function ButtonCreateApiKey({
  user,
  children,
  ...props
}: ButtonCreateApiKeyProps) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const isApiKeyPresent = !!user?.momoVariable?.apiKey;
  if (!user) {
    throw new Error("Unauthenticated user");
  }
  const { isPending, mutate } = useCreateApiKeyMutation(user?.id);

  async function handleClick() {
    mutate(undefined, {
      async onSuccess(response) {
        const returnedMessage = await response.json();
        setResponseMsg(
          JSON.stringify(
            {
              returnedMessage,
              status: response.status,
              statusText: response.statusText,
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
        variant={isApiKeyPresent ? "green" : "default"}
        {...props}
      >
        {isApiKeyPresent && !isPending && (
          <CheckCircleIcon className="mr-2 inline" strokeWidth={0.8} />
        )}{" "}
        {children}
      </LoadingButton>
      <ResponseContainer message={responseMsg} filePath="Server response" />
    </>
  );
}
