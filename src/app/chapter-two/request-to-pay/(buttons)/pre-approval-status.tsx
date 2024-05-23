"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { RequestToPay } from "@prisma/client";
import { useState } from "react";
import CreatePreApprovalForm from "../[id]/create-pre-approval-form";

interface Props {
  request: RequestToPay;
}
export default function PreApprovalStatus({ request }: Props) {
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Create_Pre-Approval:"]'>
          {` /collection/v2_0/preapproval - POST`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton loading={open} onClick={() => setOpen(true)}>
        Create Pre-Approval 
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
      <CreatePreApprovalForm open={open} request={request} setOpen={setOpen} setResponseMsg={setResponseMsg} />
    </>
  );
}
