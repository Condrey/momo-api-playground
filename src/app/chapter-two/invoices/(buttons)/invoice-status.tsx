"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        toast({
          title: "Verifying invoice status",
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast({
          title: "Failed to verify invoice status",
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
        <span className=' before:content-["Get_Invoice_Status:"]'>{`collection/v2_0/invoice/{x-referenceId} - POST`}</span>
      </ProductSubtitleContainer>

      <LoadingButton onClick={handleClick} loading={isLoading}>
        Get invoice status
      </LoadingButton>

      <ResponseContainer message={responseMsg} />
    </>
  );
}
