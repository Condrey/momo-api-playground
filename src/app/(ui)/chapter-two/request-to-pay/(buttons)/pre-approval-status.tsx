"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { RequestToPay } from "@prisma/client";
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
          referenceId: request?.PreApprovalReferenceId ?? "",
          primaryKey: request?.primaryKey ?? "",
          authorization: request?.accessToken ?? "",
          targetEnvironment: "sandbox",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setResponseMsg(JSON.stringify(data.message));
        toast({
          title: "Verifying pre-Approval status",
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}\n}"`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast({
          title: "Failed to verify pre-Approval status",
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

      <LoadingButton onClick={handleClick} loading={isLoading}>
        Check Pre-Approval Status
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
