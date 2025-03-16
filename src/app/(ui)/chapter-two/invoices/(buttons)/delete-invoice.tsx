"use client";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { deleteInvoice } from "@/lib/db/actions/collection/invoices-actions";
import { ServerMessage } from "@/lib/utils";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  invoice: Invoice;
}

export default function DeleteInvoice({ invoice }: Props) {
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const router = useRouter();
  async function deleteCreatedInvoice() {
    try {
      setIsDeletingItem(true);
      const response: ServerMessage = await deleteInvoice(invoice);
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
        onClick={deleteCreatedInvoice}
      >
        Delete Invoice
      </LoadingButton>
    </>
  );
}
