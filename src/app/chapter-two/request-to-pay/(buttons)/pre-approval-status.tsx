"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RequestToPay, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  request: RequestToPay | null;
}
export default function PreApprovalStatus({ request }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();
  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/collection/pre-approval-status", {
        method: "POST",
        body: JSON.stringify({
            referenceId:request?.referenceId??'',
          primaryKey: request?.primaryKey ?? "",
          authorization: request?.accessToken ?? "",
          targetEnvironment:'sandbox',
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
   <ProductSubtitleContainer isChecked={false}>
<span className=' before:content-["Get_Pre-Approval_Status:"]'>
  {` /collection/v2_0/preapproval/{referenceId} - GET`}
</span>
</ProductSubtitleContainer>
    
      <LoadingButton
        onClick={handleClick}
        loading={isLoading}
      >
        Check Pre-Approval Status
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}



