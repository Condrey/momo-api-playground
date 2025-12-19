import LoadingButton from "@/components/ui/loading-button";
import { deleteAllRequestsToPay } from "@/lib/db/actions/collection/request-to-pay-actions";
import { ServerMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
}
export default function DeleteAllTransactions({ userId }: Props) {
  const router = useRouter();
  const [isDeletingAll, setIsDeletingAll] = useState<boolean>(false);

  async function deleteAllTransactions(userId: string) {
    try {
      setIsDeletingAll(true);
      const response: ServerMessage = await deleteAllRequestsToPay(userId);
      toast( response.title,{
        description: response.message,
      });
    } catch (error) {
      toast("Server error",{
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
        onClick={() => deleteAllTransactions(userId)}
      >
        Delete All Transactions
      </LoadingButton>
    </>
  );
}
