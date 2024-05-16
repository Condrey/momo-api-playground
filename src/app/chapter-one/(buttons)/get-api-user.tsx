"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Props {
  user: User | null;
}
export default function GetApiUser({ user }: Props) {
  const router = useRouter();
  const isUserPresent = user?.isUserPresent !== false;

  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/provisioning/get-api-user", {
        method: "POST",
        body: JSON.stringify({
          referenceId: user?.referenceId!,
          primaryKey: user?.primaryKey!,
          secondaryKey: user?.secondaryKey!,
        }),
      });

      setResponseMsg(
        JSON.stringify(
          `Status: ${response.status},StatusText: ${response.statusText}`,
        ),
      );
      toast({
        title: response.ok
          ? "Getting sandbox user"
          : "Failed to get Sandbox user",
        description: JSON.stringify(
          `Status: ${response.status},StatusText: ${response.statusText}`,
        ),
        variant: response.ok ? "default" : "destructive",
      });
    } catch (error) {
      console.error("error: ", error);
      toast({
        title: "Err: 500",
        description: "Server Error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }
  return (
    <>
      <ProductSubtitleContainer isChecked={isUserPresent}>
        <span
          className={cn(
            isUserPresent
              ? ' before:content-["Got_User:"]'
              : ' before:content-["Get_User:"]',
          )}
        >{` /v1_0/apiuser/{X-Reference-Id} - GET`}</span>
      </ProductSubtitleContainer>
      <LoadingButton
        className={cn(isUserPresent && " -translate-x-10 -rotate-3")}
        onClick={handleClick}
        loading={isLoading}
        disabled={isUserPresent}
      >
        Get Api User
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
