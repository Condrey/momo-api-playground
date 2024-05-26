"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import LoadingButton from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { useState } from "react";
import AddEditRequestToPay from "../(components)/add-edit-request-to-pay";
import TableOfRequestToPay from "../(components)/table-of-request-to-pay";
import DeleteAllTransactions from "../request-to-pay/(buttons)/delete-all-transactions";
interface Props {
  user: GetFindResult<
    Prisma.$UserPayload<DefaultArgs>,
    { include: { RequestToPay: boolean } }
  > | null;
}
export default function RequestToPay({ user }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const hasRequestToPay: boolean = user!.RequestToPay.length > 0;

  return (
    <>
      <ProductSubtitleContainer>
        <span
          className={cn(' before:content-["Request_To_Pay:"]')}
        >{` /collection/v1_0/requesttopay - POST`}</span>
      </ProductSubtitleContainer>

      {/* Table for showing user requests */}
      {hasRequestToPay && <TableOfRequestToPay user={user} />}

      {/* Button to request payment  */}
      <LoadingButton onClick={() => setOpen(true)} loading={false}>
        {hasRequestToPay ? "Make more requests to pay" : "Request To Pay"}
      </LoadingButton>

      {/**
       *
       * Responsive drawer for creating request to pay
       *
       */}
      <> {hasRequestToPay && <DeleteAllTransactions userId={user?.id!} />}</>
      <AddEditRequestToPay open={open} setOpen={setOpen} user={user} />
    </>
  );
}
