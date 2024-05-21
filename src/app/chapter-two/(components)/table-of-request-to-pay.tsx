import ResponseContainer from "@/components/response-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import LoadingButton from "@/components/ui/loading-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  deleteAllRequestsToPay,
  deleteRequestToPay,
} from "@/lib/db/actions/collection/request-to-pay-actions";
import { ServerMessage, cn } from "@/lib/utils";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SmallCodeSnippetContainer from "../../../components/small-code-snippet-container";

interface Props {
  user: GetFindResult<
    Prisma.$UserPayload<DefaultArgs>,
    { include: { RequestToPay: boolean } }
  > | null;
}

export default function TableOfRequestToPay({ user }: Props) {
  const requestsToPay = user?.RequestToPay;
  const numberOfRequests = `${requestsToPay?.length} request${requestsToPay?.length === 1 ? "" : "s"}`;
  const [showTable, setShowTable] = useState(true);
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);
  const router = useRouter();

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
      router.refresh();
    }
  }

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
      <div
        className="flex cursor-pointer items-center gap-4"
        onClick={() => setShowTable(!showTable)}
      >
        <span className="peer text-xl font-semibold uppercase hover:text-amber-500 dark:hover:text-amber-300">
          Table showing requests made{" "}
          <Badge variant={"destructive"}>{numberOfRequests}</Badge>
        </span>
        <span className="hidden md:hover:flex md:peer-hover:flex">
          {showTable ? "Hide table" : "Show table"}
        </span>
      </div>

      <Alert
        className={cn(
          showTable
            ? "flex flex-col items-center gap-2 px-4 py-2 lg:items-start"
            : "hidden",
        )}
      >
        <AlertTitle className=" underline">Table key</AlertTitle>
        <AlertDescription>
          <div className="flex items-center gap-2">
            <span className="font-bold">Status</span>
            <div className="flex items-center">
              <Dot className="size-16 text-green-700" /> Checked, verified
            </div>
            <div className="flex items-center">
              <Dot className="size-16 text-blue-700" /> Not checked
            </div>
            <div className="flex items-center">
              <Dot className="size-16 text-red-700" /> Timed out
            </div>
          </div>
          <span>
            To verify request transaction status, click on the respective table
            entry
          </span>
        </AlertDescription>
      </Alert>

      <Table className={cn(showTable ? "table " : "hidden")}>
        <TableHeader className="bg-foreground *:text-background dark:border dark:bg-background dark:*:text-foreground">
          <TableHead>#</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reference Id</TableHead>
          <TableHead>External Id</TableHead>
          <TableHead>Party Id</TableHead>
          <TableHead>Payer Message</TableHead>
          <TableHead>Payee Note</TableHead>
        </TableHeader>
        <TableBody>
          {requestsToPay?.map((request, index) => {
            const numbering = index + 1;
            const isChecked: boolean = request.isChecked;
            const timeDifference = Date.now() - request.createdAt.getTime();
            const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;
            return (
              <HoverCard key={request.id}>
                <HoverCardTrigger asChild>
                  <TableRow className="odd:bg-stone-700 odd:text-stone-50 even:bg-amber-300 even:text-slate-950 odd:hover:text-foreground dark:odd:bg-secondary dark:even:bg-amber-200/50 dark:even:text-background">
                    <TableCell> {numbering}</TableCell>
                    <TableCell>{request.amount}</TableCell>
                    <TableCell>{request.currency}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            " size-3 rounded-full",
                            isChecked ? " bg-green-700" : " bg-blue-700",
                          )}
                        />
                        <div
                          className={cn(
                            " size-3 rounded-full bg-red-700",
                            isExpired ? " visible" : " invisible",
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="line-clamp-1 flex w-96  select-all flex-nowrap overflow-ellipsis ">
                        {request.referenceId}
                      </span>
                    </TableCell>
                    <TableCell>{request.externalId}</TableCell>
                    <TableCell>{request.partyId}</TableCell>
                    <TableCell>
                      <span className="line-clamp-1 flex w-64  flex-nowrap overflow-ellipsis ">
                        {request.payerMessage}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="line-clamp-1 flex w-64 flex-nowrap overflow-ellipsis ">
                        {request.payeeNote}
                      </span>
                    </TableCell>
                  </TableRow>
                </HoverCardTrigger>
                <HoverCardContent className="flex w-full max-w-md flex-col items-center gap-4 *:w-full *:space-y-2 md:flex-row">
                  <div className="flex flex-col items-center  gap-2 *:w-full">
                    <span className="hidden items-center justify-center text-center text-stone-700/50 dark:text-secondary/90  md:flex md:flex-row md:text-4xl lg:text-5xl">{`#${numbering}`}</span>
                    <LoadingButton
                      loading={isCheckingStatus}
                      variant={"default"}
                      onClick={() =>
                        checkTransactionStatus(
                          request as UpdateRequestToPaySchema,
                        )
                      }
                    >
                      Check Status
                    </LoadingButton>
                    <LoadingButton
                      variant={"destructive"}
                      loading={isDeletingTransaction}
                      onClick={() =>
                        deleteTransaction(request as UpdateRequestToPaySchema)
                      }
                    >
                      Delete Transaction
                    </LoadingButton>
                    <LoadingButton
                      variant={"destructive"}
                      loading={isDeletingAll}
                      onClick={() => deleteAllTransactions(request.userId)}
                    >
                      Delete All
                    </LoadingButton>
                    <span
                      className={cn(
                        !isExpired
                          ? "hidden"
                          : "flex justify-center text-center font-bold text-destructive",
                      )}
                    >
                      Timed out transaction
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 *:space-y-2 ">
                    <SmallCodeSnippetContainer
                      title={`Transaction#${numbering}'s reference id`}
                      text={request.referenceId}
                      isMultiLine={false}
                    />
                    <SmallCodeSnippetContainer
                      title={`Transaction#${numbering}'s authorization`}
                      text={request.accessToken}
                      isMultiLine={false}
                    />
                    <SmallCodeSnippetContainer
                      title={`Financial Transaction Id`}
                      text={
                        request.financialTransactionId === null
                          ? null
                          : `${request.financialTransactionId}`
                      }
                      isMultiLine={false}
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </TableBody>
        <TableCaption>These are your requests</TableCaption>
      </Table>
      <ResponseContainer message={responseMsg} />
    </>
  );
}
