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
import { useRouter } from "next/navigation";
import { useState } from "react";
import SmallCodeSnippetContainer from "../../../components/small-code-snippet-container";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

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

  return (
    <>
      <div
        className="flex cursor-pointer flex-wrap items-center gap-4"
        onClick={() => setShowTable(!showTable)}
      >
        <span
          title={showTable ? "Hide table" : "Show table"}
          className="peer flex flex-wrap items-center gap-2 text-xl font-semibold uppercase hover:text-amber-500 dark:hover:text-amber-300"
        >
          {!showTable ? <EyeOff /> : <Eye />} Table showing requests made{" "}
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
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 lg:items-start lg:justify-start">
            <span className="font-bold">Status</span>
            <div className="flex items-center gap-2">
              <div className=" size-3 rounded-full bg-green-700" /> Checked,
              verified
            </div>
            <div className="flex items-center gap-2">
              <div className=" size-3 rounded-full bg-blue-700" /> Not checked
            </div>
            <div className="flex items-center gap-2">
              <div className=" size-3 rounded-full bg-red-700" /> Timed out
            </div>
          </div>
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
              <Link
                title="click to view transaction"
                key={request.id}
                href={`/chapter-two/request-to-pay/${request.id}`}
                className="table-row odd:bg-stone-700 odd:text-stone-50 even:bg-amber-300 even:text-slate-950 odd:hover:bg-stone-500 odd:hover:text-stone-50 even:hover:bg-amber-200 dark:border-x dark:odd:bg-secondary dark:even:bg-background dark:even:text-foreground dark:odd:hover:bg-secondary/50"
              >
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
              </Link>
            );
          })}
        </TableBody>
        <TableCaption>These are your requests</TableCaption>
      </Table>
    </>
  );
}
