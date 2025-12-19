"use client";
import LoadingButton from "@/components/ui/loading-button";
import { deletePayment } from "@/lib/db/actions/collection/payments-actions";
import { ServerMessage } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  payment: Payment;
}

export default function DeletePayment({ payment }: Props) {
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const router = useRouter();
  async function deleteCreatedPayment() {
    try {
      setIsDeletingItem(true);
      const response: ServerMessage = await deletePayment(payment);
      toast( response.title,{
        description: response.message,
      });
    } catch (error) {
      console.error("error:", error);
      toast.error("Server error",{
  
        description: "There is a problem with the server, try again.",
      });
    } finally {
      setIsDeletingItem(false);
      router.refresh();
      router.replace("/chapter-two");
    }
  }

  return (
    <>
      <LoadingButton
        variant={"destructive"}
        loading={isDeletingItem}
        onClick={deleteCreatedPayment}
      >
        Delete Payment
      </LoadingButton>
    </>
  );
}
