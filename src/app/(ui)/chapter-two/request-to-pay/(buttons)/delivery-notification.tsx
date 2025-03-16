"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { RequestToPay } from "@prisma/client";
import { useState } from "react";
import CreatePreApprovalForm from "../[id]/create-pre-approval-form";
import CreateDeliveryNotificationForm from "../[id]/create-delivery-notification-form";

interface Props {
  request: RequestToPay;
}
export default function DeliveryNotification({ request }: Props) {
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState<undefined | string>(undefined);

  return (
    <>
      <ProductSubtitleContainer isChecked={false}>
        <span className=' before:content-["Request_To_Pay_Delivery_Notification:"]'>
          {` /collection/v1_0/requesttopay/{referenceId}/deliverynotification - POST`}
        </span>
      </ProductSubtitleContainer>

      <LoadingButton loading={open} onClick={() => setOpen(true)}>
        Create delivery Notification
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
      <CreateDeliveryNotificationForm
        open={open}
        request={request}
        setOpen={setOpen}
        setResponseMsg={setResponseMsg}
      />
    </>
  );
}
