'use client'
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  request: UpdateRequestToPaySchema;
}
export default function TransactionStatus({ request }: Props) {
  const router = useRouter();
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);

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
        toast({
          title: "Request was a success",
          description: `${data.message}`,
        });
      } else {
        const data = response.status;

        console.log("No Ok data:", data);

        toast({
          title: "Failed request",
          description: JSON.stringify(response.statusText),
          variant: "destructive",
        });
      }
    } catch (e) {
      console.log("Server Error: ", e);
      toast({
        title: "Server Error",
        description: "Something is wrong with the server, please try again.!",
        variant: "destructive",
      });
    } finally {
      setIsCheckingStatus(false);
      router.refresh();
    }
  }

  return (
    <>
      <LoadingButton
        loading={isCheckingStatus}
        variant={"default"}
        onClick={() => checkTransactionStatus(request)}
      >
        Check Status
      </LoadingButton>{" "}
      <ResponseContainer message={responseMsg} />
    </>
  );
}
