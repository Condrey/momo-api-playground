"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import EmptyContainer from "@/components/query-containers/empty-container";
import { SubtitleOnly } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import TableOfRequestToPay from "../(components)/table-of-request-to-pay";
import ButtonAddEditRequestToPay from "./button-add-edit-request-to-pay";

interface Props {
  user: UserData;
}
export default function RequestToPay({ user }: Props) {
  const hasRequestToPay: boolean = !!user.RequestToPay.length;

  return (
    <>
      <ProductSubtitleContainer>
        <span className={cn('before:content-["Request_To_Pay:"]')}>
          /collection/v1_0/requesttopay - <Badge variant={"api"}>POST</Badge>
        </span>
      </ProductSubtitleContainer>
      <SubtitleOnly>
        This operation is used to request a payment from a consumer (Payer). The
        payer will be asked to authorize the payment. The transaction will be
        executed once the payer has authorized the payment.
      </SubtitleOnly>
      {/* Table for showing user requests */}
      {hasRequestToPay ? (
        <TableOfRequestToPay user={user} />
      ) : (
        <EmptyContainer
          message={"There is no request to pay made yet. Please add"}
        >
          <ButtonAddEditRequestToPay user={user} variant={"secondary"}>
            Add a Request To Pay
          </ButtonAddEditRequestToPay>
        </EmptyContainer>
      )}
    </>
  );
}
