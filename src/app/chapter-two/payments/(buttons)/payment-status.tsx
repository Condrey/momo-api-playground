"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { Payment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  payment: Payment | null;
}
export default function PaymentStatus({ payment }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleClick() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/collection/confirm-payment", {
        method: "POST",
        body: JSON.stringify({
          authorization: payment?.authorization ?? "",
          primaryKey: payment?.primaryKey ?? "",
          targetEnvironment: payment?.targetEnvironment ?? "",
          id: payment?.id ?? "",
          referenceId: payment?.referenceId ?? "",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setResponseMsg(JSON.stringify(data.message));
        toast( "Verifying payment status",{
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast.error("Failed to verify payment status",{
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
        <span className=' before:content-["Get_Payment_Status:"]'>{`collection/v2_0/payment/{x-referenceId} - POST`}</span>
      </ProductSubtitleContainer>

      <LoadingButton onClick={handleClick} loading={isLoading}>
        Get payment status
      </LoadingButton>

      <ResponseContainer message={responseMsg} />
    </>
  );
}
