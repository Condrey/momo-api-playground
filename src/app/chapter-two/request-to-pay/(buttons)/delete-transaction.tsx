"use client";
import LoadingButton from "@/components/ui/loading-button";
import { deleteRequestToPay } from "@/lib/db/actions/collection/request-to-pay-actions";
import { ServerMessage } from "@/lib/utils";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
      toast(response.title,{ 
        description: response.message,
      });
    } catch (error) {
      console.error("error:", error);
      toast("Server error",{  
              description: "There is a problem with the server, try again.",
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
