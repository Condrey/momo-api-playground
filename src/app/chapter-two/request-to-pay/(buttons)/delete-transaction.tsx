"use client";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { deleteRequestToPay } from "@/lib/db/actions/collection/request-to-pay-actions";
import { ServerMessage } from "@/lib/utils";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  request: UpdateRequestToPaySchema;
}

export default function DeleteTransaction({ request }: Props) {
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);
  const router = useRouter();
  async function deleteTransaction(transaction: UpdateRequestToPaySchema) {
    try {
      setIsDeletingTransaction(true);
      const response: ServerMessage = await deleteRequestToPay(transaction);
      toast({
        title: response.title,
        description: response.message,
        variant: response.type === "error" ? "destructive" : "default",
      });
    } catch (error) {
      console.error("error:", error);
      toast({
        title: "Server error",
        description: "There is a problem with the server, try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingTransaction(false);
      router.replace("/chapter-two");
    }
  }

  return (
    <>
      <LoadingButton
        variant={"destructive"}
        loading={isDeletingTransaction}
        onClick={() => deleteTransaction(request)}
      >
        Delete Transaction
      </LoadingButton>
    </>
  );
}
