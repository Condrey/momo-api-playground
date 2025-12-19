import LoadingButton from "@/components/ui/loading-button";
import { deleteAllInvoices } from "@/lib/db/actions/collection/invoices-actions";
import { ServerMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
}
export default function DeleteAllInvoices({ userId }: Props) {
  const router = useRouter();
  const [isDeletingAll, setIsDeletingAll] = useState<boolean>(false);

  async function deleteAllCreatedInvoices(userId: string) {
    try {
      setIsDeletingAll(true);
      const response: ServerMessage = await deleteAllInvoices(userId);
      toast(response.title,{
        description: response.message,
      });
    } catch (error) {
      toast.error( "Server error",{
        description: "There is a problem with the server, try again.",
      });
    } finally {
      setIsDeletingAll(false);
      router.refresh();
    }
  }

  return (
    <>
      <LoadingButton
        variant={"destructive"}
        loading={isDeletingAll}
        onClick={() => deleteAllCreatedInvoices(userId)}
      >
        Delete All Invoices
      </LoadingButton>
    </>
  );
}
