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
export default function CancelInvoice({ invoice }: Props) {
  const isInvoiceCancelled = invoice?.isCancelled;
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  async function handleClick() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/collection/cancel-invoice", {
        method: "POST",
        body: JSON.stringify({
          authorization: invoice?.authorization ?? "",
          referenceId: invoice?.referenceId ?? "",
          id: invoice?.id ?? "",
          callbackUrl: invoice?.callbackUrl ?? "",
          externalId: invoice?.externalId ?? "",
          primaryKey: invoice?.primaryKey ?? "",
          targetEnvironment: invoice?.targetEnvironment ?? "",
        }),
      });

      if (response.ok) {
        setResponseMsg(
          `{\n"Status":"${response.status}",\n"StatusText":"${response.statusText}"\n}`,
        );
        toast("Cancelling invoice",{
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      } else {
        console.error("Not ok response: ", response.statusText);
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}\n}"`,
        );
        toast.error( "Failed to cancel invoice",{
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
        <span className=' before:content-["Cancel_Invoice:"]'>
          {` /collection/v2_0/invoice/{referenceId} - DEL`}
        </span>
      </ProductSubtitleContainer>

      {/* Button to cancel invoice  */}
      <LoadingButton
        loading={isLoading}
        disabled={isInvoiceCancelled}
        onClick={handleClick}
        variant={"destructive"}
      >
        {isInvoiceCancelled ? "Invoice already cancelled" : " Cancel Invoice"}
      </LoadingButton>

      <ResponseContainer message={responseMsg} />
    </>
  );
}
