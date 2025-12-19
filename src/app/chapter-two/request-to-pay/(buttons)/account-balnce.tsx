"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { RequestToPay } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  request: RequestToPay | null;
}
export default function AccountBalance({ request }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/collection/account-balance", {
        method: "POST",
        body: JSON.stringify({
          primaryKey: request?.primaryKey ?? "",
          authorization: request?.accessToken ?? "",
          targetEnvironment: "sandbox",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setResponseMsg(JSON.stringify(data.message));
        toast("Account balance",{
          description: `Status: "${response.status}",StatusText: "${response.statusText}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast.error("Failed to get Account balance",{
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      }
    } catch (error) {
      console.error("error: ", error);
      toast.error("Err: 500",{
        description: "Server Error",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }
  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Get_Account_Balance:"]'>
          {` /collection/v1_0/account/balance - GET`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton onClick={handleClick} loading={isLoading}>
        Get Account Balance
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
