"use client";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { deletePayment } from "@/lib/db/actions/collection/payments-actions";
import { ServerMessage } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
