import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { useState } from "react";

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
        className="flex cursor-pointer items-center gap-4"
        onClick={() => setShowTable(!showTable)}
      >
        <span className="peer text-xl hover:text-amber-500 dark:hover:text-amber-300">
          Table showing requests made{" "}
          <Badge variant={"destructive"}>{numberOfRequests}</Badge>
        </span>
        <span className="hidden md:hover:flex md:peer-hover:flex">
          {showTable ? "Hide table" : "Show table"}
        </span>
      </div>
      <Table className={cn(showTable ? "table " : "hidden")}>
        <TableHeader className="bg-foreground *:text-background dark:bg-background dark:*:text-foreground dark:border">
          <TableHead>#</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>External Id</TableHead>
          <TableHead>Party Id</TableHead>
          <TableHead>Payer Message</TableHead>
          <TableHead>Payee Note</TableHead>
        </TableHeader>
        <TableBody>
          {requestsToPay?.map((request, index) => {
            const numbering = index + 1;
            return (
              <TableRow
                key={request.id}
                className="odd:bg-stone-700 even:bg-amber-300 odd:text-stone-50 even:text-slate-950 dark:odd:bg-secondary dark:even:bg-amber-200/50 dark:even:text-background"
              >
                <TableCell>{numbering}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.currency}</TableCell>
                <TableCell>{request.externalId}</TableCell>
                <TableCell>{request.partyId}</TableCell>
                <TableCell>
                  <span className="flex flex-nowrap">
                    {request.payerMessage}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex flex-nowrap">{request.payeeNote}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCaption>These are your requests</TableCaption>
      </Table>
    </>
  );
}
