"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { RequestToPay, User } from "@prisma/client";
import { useState } from "react";
import CreatePaymentsForm from "../(components)/create-payments-form";

interface Props {
  user: User;
}
export default function CreatePayments({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Create_Payments:"]'>
          {` /collection/v2_0/payment - POST`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton loading={open} onClick={() => setOpen(true)}>
        Create Payments
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
      <CreatePaymentsForm
        open={open}
        user={user}
        setOpen={setOpen}
        setResponseMsg={setResponseMsg}
      />
    </>
  );
}
