"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { RequestToPay } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  request: RequestToPay;
}
export default function RequestToPayTransactionStatus({ request }: Props) {
  const router = useRouter();
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);
  const isChecked: boolean = request?.isChecked!;

  async function checkTransactionStatus(transaction: UpdateRequestToPaySchema) {
    try {
      setIsCheckingStatus(true);
      const body = JSON.stringify(transaction);
      const response = await fetch("/api/collection/confirm-request-to-pay", {
        method: "POST",
        body,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMsg(JSON.stringify(data.message2));
        toast("Request was a success",{
          description: `${data.message}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status":"${response.status}"\n"StatusText":"${response.statusText}"\n}`,
        );
        toast.error("Failed request",{
          description: JSON.stringify(response.statusText),
        });
      }
    } catch (e) {
      console.log("Server Error: ", e);
      toast.error("Server Error",{
        description: "Something is wrong with the server, please try again.!",
      });
    } finally {
      setIsCheckingStatus(false);
      router.refresh();
    }
  }

  return (
    <>
      <ProductSubtitleContainer isChecked={isChecked}>
        <span
          className={cn(
            isChecked
              ? ' before:content-["Got_Request_to_Pay_Transaction_Status:"]'
              : ' before:content-["Get_Request_to_Pay_Transaction_Status:"]',
          )}
        >
          {` /collection/v1_0/requesttopay/{referenceId} - GET`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton
        loading={isCheckingStatus}
        variant={isChecked ? "green" : "default"}
        onClick={() =>
          checkTransactionStatus(request as UpdateRequestToPaySchema)
        }
      >
        {isChecked ? "Re-Check Transaction Status" : "Check Transaction Status"}
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
