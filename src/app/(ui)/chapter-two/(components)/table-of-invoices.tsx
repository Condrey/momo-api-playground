import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Invoice } from "@prisma/client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  invoices: Invoice[];
}

export default function TableOfCreatedInvoices({ invoices }: Props) {
  const numberOfInvoices = `${invoices?.length} invoice${invoices?.length === 1 ? "" : "s"}`;

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
          {!showTable ? <EyeOff /> : <Eye />} Table showing created invoices
          <Badge variant={"destructive"}>{numberOfInvoices}</Badge>
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
              <div className=" size-3 rounded-full bg-fuchsia-700 " /> Cancelled
            </div>
            <div className="flex items-center gap-2">
              <div className=" size-3 rounded-full bg-red-700" /> Timed out
            </div>
          </div>
        </AlertDescription>
      </Alert>
      <Table className={cn(showTable ? "table " : "hidden")}>
        <TableHeader>
          <TableHead>#</TableHead>
          <TableHead>Check</TableHead>
          <TableHead>amount</TableHead>
          <TableHead>currency</TableHead> <TableHead>Status</TableHead>
          <TableHead>ExternalId</TableHead>
          <TableHead>intendedPayerPartyId</TableHead>
          <TableHead>PayeePartyId</TableHead>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice, index) => {
            const numbering = index + 1;
            const isChecked: boolean = invoice.isChecked;
            const isCancelled: boolean = invoice.isCancelled;
            const timeDifference = Date.now() - invoice.createdAt.getTime();
            const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;
            return (
              <Link
                title="click to view invoice"
                key={invoice.id}
                href={`/chapter-two/invoices/${invoice.id}`}
                className="table-row cursor-pointer odd:bg-stone-700 odd:text-stone-50 even:bg-amber-300 even:text-slate-950 odd:hover:bg-stone-500 odd:hover:text-stone-50 even:hover:bg-amber-200 dark:border dark:odd:bg-secondary dark:even:bg-background dark:even:text-foreground dark:odd:hover:bg-secondary/50"
              >
                <TableCell>{numbering}</TableCell>
                <TableCell>
                  {isChecked ? (
                    <span className=" text-green-700">Checked</span>
                  ) : (
                    <span className=" text-destructive">Not Checked</span>
                  )}
                </TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.currency}</TableCell>
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
                        " size-3 rounded-full bg-fuchsia-700",
                        isCancelled ? " flex" : " hidden",
                      )}
                    />
                    <div
                      className={cn(
                        " size-3 rounded-full bg-red-700",
                        isExpired ? " flex " : " hidden",
                      )}
                    />
                  </div>
                </TableCell>
                <TableCell>{invoice.externalId}</TableCell>
                <TableCell>{invoice.intendedPayerPartyId}</TableCell>
                <TableCell>{invoice.payeePartyId}</TableCell>
              </Link>
            );
          })}
        </TableBody>
        <TableCaption>These are your created invoices</TableCaption>
      </Table>
    </>
  );
}
