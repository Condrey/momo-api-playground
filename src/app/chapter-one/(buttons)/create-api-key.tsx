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
export default function CreateApiKey({ user }: Props) {
  const isApiKeyPresent = user?.apiKey !== null;
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  async function handleClick() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/provisioning/create-api-key", {
        method: "POST",
        body: JSON.stringify({
          referenceId: user?.referenceId!,
          primaryKey: user?.primaryKey!,
          secondaryKey: user?.secondaryKey!,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMsg(
          `{\n"Status":"${response.status}",\n"StatusText":"${response.statusText}",\n"apiKey":"${data.message}"\n}`,
        );
        toast({
          title: "Creating Api Key Success",
          description: JSON.stringify(data.message),
        });
      } else {
        console.error("Not ok response: ", response.statusText);
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}\n}"`,
        );
        toast({
          title: "Failed to create Api Key",
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
      <ProductSubtitleContainer isChecked={isApiKeyPresent}>
        <span
          className={cn(
            isApiKeyPresent
              ? ' before:content-["Created_API_key:"]'
              : ' before:content-["Create_API_key:"]',
          )}
        >{` /v1_0/apiuser/{X-Reference-Id}/apikey - POST`}</span>
      </ProductSubtitleContainer>
      <LoadingButton
        className={cn(isApiKeyPresent && " translate-x-10 rotate-3")}
        onClick={handleClick}
        disabled={isApiKeyPresent}
        loading={isLoading}
      >
        Create Api Key
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
