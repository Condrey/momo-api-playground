"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { RequestToPay } from "@prisma/client";
import { useState } from "react";
import CreateRequestToWithdrawV2Form from "../[id]/create-request-to-withdraw-v2-form";

interface Props {
  request: RequestToPay;
}
export default function RequestToWithdrawV1({ request }: Props) {
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Request_To_Withdraw_V2:"]'>
          {` /collection/v2_0/requesttowithdraw - POST`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton loading={open} onClick={() => setOpen(true)}>
        Request to withdraw v2
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
      <CreateRequestToWithdrawV2Form
        open={open}
        request={request}
        setOpen={setOpen}
        setResponseMsg={setResponseMsg}
      />
    </>
  );
}
