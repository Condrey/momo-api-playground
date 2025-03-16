import LoadingButton from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { deleteAllRequestsToPay } from "@/lib/db/actions/collection/request-to-pay-actions";
import { ServerMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      toast({
        title: response.title,
        description: response.message,
        variant: response.type === "error" ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        title: "Server error",
        description: "There is a problem with the server, try again.",
        variant: "destructive",
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
