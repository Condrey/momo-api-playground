"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import LoadingButton from "@/components/ui/loading-button";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { useState } from "react";
import CreatePaymentForm from "../(components)/create-payment-form";
import TableOfCreatedPayments from "../(components)/table-of-payment";
import DeleteAllPayments from "../payments/(buttons)/delete-all-payments";

interface Props {
  user: GetFindResult<
    Prisma.$UserPayload<DefaultArgs>,
    { include: { payments: boolean } }
  > | null;
}
export default function CreatePayment({ user }: Props) {
  const [open, setOpen] = useState(false);
  const hasPayments: boolean = user!.payments.length > 0;

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Create_Payment:"]'>
          {` /collection/v2_0/payment - POST`}
        </span>
      </ProductSubtitleContainer>

      {/* Table for showing user created payments */}
      {hasPayments && <TableOfCreatedPayments payments={user?.payments!} />}

      {/* Button to create payment  */}
      <LoadingButton loading={false} onClick={() => setOpen(true)}>
        {hasPayments ? " Create more Payments" : " Create Payment"}
      </LoadingButton>

      {/**
       *
       * Responsive drawer for creating payment
       *
       */}
      <>{hasPayments && <DeleteAllPayments userId={user?.id!} />}</>
      <CreatePaymentForm open={open} user={user} setOpen={setOpen} />
    </>
  );
}
