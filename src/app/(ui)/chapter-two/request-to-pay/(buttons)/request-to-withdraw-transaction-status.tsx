"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RequestToWithdraw } from "@prisma/client";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  requestsToWithdraw: RequestToWithdraw[];
  isExpired: boolean;
}
export default function RequestToWithdrawTransactionStatus({
  requestsToWithdraw,
  isExpired,
}: Props) {
  const hasRequestsToWithdraw: boolean = requestsToWithdraw.length > 0;
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const router = useRouter();
  async function handleClick(requestToWithdraw: RequestToWithdraw) {
    try {
      const response = await fetch(
        "/api/collection/confirm-request-to-withdraw",
        {
          method: "POST",
          body: JSON.stringify({
            id: requestToWithdraw.id,
            referenceId: requestToWithdraw?.referenceId ?? "",
            primaryKey: requestToWithdraw?.primaryKey ?? "",
            authorization: requestToWithdraw?.authorization ?? "",
            targetEnvironment: "sandbox",
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        setResponseMsg(JSON.stringify(data.message));
        toast({
          title: "Verifying withdraw transaction status",
          description: `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        });
      } else {
        setResponseMsg(
          `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
        );
        toast({
          title: "Failed to verify withdraw transaction status",
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("error: ", error);
      toast({
        title: "Err: 500",
        description: "Server Error",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  }
  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Table_showing_requests_to_Withdraw"]' />
      </ProductSubtitleContainer>
      <span className={cn(!hasRequestsToWithdraw && "hidden")}>
        Click to check transaction status
      </span>
      <Table className={cn(!hasRequestsToWithdraw && "hidden")}>
        <TableHeader>
          <TableHead>#</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Check</TableHead>
          <TableHead>version</TableHead>
          <TableHead>ReferenceId</TableHead>
          <TableHead>Authorization</TableHead>
        </TableHeader>
        <TableBody>
          {requestsToWithdraw.map((request, index) => {
            const numbering = index + 1;
            const isChecked = request.isChecked;

            return (
              <TableRow
                key={request.id}
                onClick={() => handleClick(request)}
                title="Click to check status"
              >
                <TableCell>{numbering}</TableCell>
                <TableCell className=" font-bold uppercase">
                  {isExpired ? (
                    <span className=" text-destructive">Expired</span>
                  ) : (
                    <span className=" text-green-700">Valid</span>
                  )}
                </TableCell>
                <TableCell>
                  {isChecked ? (
                    <span className=" text-green-700">Checked</span>
                  ) : (
                    <span className=" text-destructive">Not Checked</span>
                  )}
                </TableCell>
                <TableCell>{request.version}</TableCell>

                <TableCell className=" pointer-events-none">
                  <SmallCodeSnippetContainer
                    text={request.referenceId!}
                    isMultiLine={false}
                    title=""
                  />
                </TableCell>
                <TableCell className=" pointer-events-none">
                  <SmallCodeSnippetContainer
                    text={request.authorization!}
                    isMultiLine={false}
                    title=""
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Alert className={cn(hasRequestsToWithdraw && "hidden")}>
        <Info /> <AlertTitle>Empty requests</AlertTitle>
        <AlertDescription>
          All your requests to withdraw shall appear here.
        </AlertDescription>
      </Alert>

      <ResponseContainer message={responseMsg} />
    </>
  );
}
