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
export default function CreateAccessToken({ user }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAccessTokenGot =
    user?.accessToken !== null && user?.accessToken !== undefined;
  const router = useRouter();
  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/provisioning/create-access-token", {
        method: "POST",
        body: JSON.stringify({
          primaryKey: user?.primaryKey ?? "",
          authorization: user?.authorization ?? "",
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setResponseMsg(
          `{\n"access_token": "${data.message.access_token}",\n"token_type": "${data.message.token_type}",\n"expires_in":"${data.message.expires_in}"\n}`,
        );
        toast({
          title: "Creating Access Token",
          description: JSON.stringify(
            `access_token: ${data.message.access_token},token_type: ${data.message.token_type},expires_in:${data.message.expires_in}`,
          ),
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}\n}"`,
        );
        toast({
          title: "Failed to create Access Token",
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
          variant: "destructive",
        });
      }
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
      <ProductSubtitleContainer isChecked={isAccessTokenGot}>
        <span
          className={cn(
            isAccessTokenGot
              ? ' before:content-["Created_Access_Token:"]'
              : ' before:content-["Create_Access_Token:"]',
          )}
        >
          /collection/token/ - POST
        </span>
      </ProductSubtitleContainer>
      <p className=" block">
        Access token has an expiry time of 3600 from the time it was created
      </p>
      <LoadingButton
        onClick={handleClick}
        loading={isLoading}
        variant={isAccessTokenGot ? "green" : "default"}
      >
        {isAccessTokenGot ? "Re-create Access Token" : "Create Access Token"}
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
