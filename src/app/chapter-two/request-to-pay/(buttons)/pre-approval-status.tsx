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
        toast("Verifying pre-Approval status",{
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}\n}"`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast("Failed to verify pre-Approval status",{
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
