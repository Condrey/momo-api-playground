"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  invoice: Invoice | null;
}
export default function InvoiceStatus({ invoice }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleClick() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/collection/confirm-invoice", {
        method: "POST",
        body: JSON.stringify({
          authorization: invoice?.authorization ?? "",
          primaryKey: invoice?.primaryKey ?? "",
          targetEnvironment: invoice?.targetEnvironment ?? "",
          id: invoice?.id ?? "",
          referenceId: invoice?.referenceId ?? "",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setResponseMsg(JSON.stringify(data.message));
        toast("Verifying invoice status",{
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast.error("Failed to verify invoice status",{
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
        <span className=' before:content-["Get_Invoice_Status:"]'>{`collection/v2_0/invoice/{x-referenceId} - POST`}</span>
      </ProductSubtitleContainer>

      <LoadingButton onClick={handleClick} loading={isLoading}>
        Get invoice status
      </LoadingButton>

      <ResponseContainer message={responseMsg} />
    </>
  );
}
