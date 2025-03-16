"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import LoadingButton from "@/components/ui/loading-button";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { useState } from "react";
import DeleteAllInvoices from "../invoices/(buttons)/delete-all-invoices";
import TableOfCreatedInvoices from "../(components)/table-of-invoices";
import CreateInvoiceForm from "../(components)/create-invoice-form";

interface Props {
  user: GetFindResult<
    Prisma.$UserPayload<DefaultArgs>,
    { include: { invoices: boolean } }
  > | null;
}
export default function CreateInvoice({ user }: Props) {
  const [open, setOpen] = useState(false);
  const hasInvoices: boolean = user!.invoices.length > 0;

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Create_Invoice:"]'>
          {` /collection/v2_0/invoice - POST`}
        </span>
      </ProductSubtitleContainer>

      {/* Table for showing user created invoices */}
      {hasInvoices && <TableOfCreatedInvoices invoices={user?.invoices!} />}

      {/* Button to create invoice  */}
      <LoadingButton loading={false} onClick={() => setOpen(true)}>
        {hasInvoices ? " Create more Invoices" : " Create Invoice"}
      </LoadingButton>

      {/**
       *
       * Responsive drawer for creating invoice
       *
       */}
      <>{hasInvoices && <DeleteAllInvoices userId={user?.id!} />}</>
      <CreateInvoiceForm open={open} user={user} setOpen={setOpen} />
    </>
  );
}
