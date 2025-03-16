import BreadCrumb from "@/components/bread-crumb";
import Title from "@/components/title";
import { fetchRequestToPayById } from "@/lib/db/data/request-to-pay-data";
import { cn } from "@/lib/utils";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { Prisma } from "@prisma/client";
import { DefaultArgs, GetFindResult } from "@prisma/client/runtime/library";
import { Metadata } from "next";
import AccountBalance from "../(buttons)/account-balnce";
import BasicUserInfo from "../(buttons)/basic-user-info";
import DeleteTransaction from "../(buttons)/delete-transaction";
import PreApproval from "../(buttons)/pre-approval";
import PreApprovalStatus from "../(buttons)/pre-approval-status";
import RequestToPayTransactionStatus from "../(buttons)/request-to-pay-transaction-status";
import RequestToWithdrawTransactionStatus from "../(buttons)/request-to-withdraw-transaction-status";
import RequestToWithdrawV1 from "../(buttons)/request-to-withhhdraw-v1";
import RequestToWithdrawV2 from "../(buttons)/request-to-withhhdraw-v2";
import TransactionParams from "./transaction-params";
import DeliveryNotification from "../(buttons)/delivery-notification";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Request to pay",
  description:
    "Detailed information of request to pay. Get to know what happens under the hood.",
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { id } = params;
  // fetch the request to pay from the database
  const request: GetFindResult<
    Prisma.$RequestToPayPayload<DefaultArgs>,
    { include: { RequestToWithdraw: boolean } }
  > | null = await fetchRequestToPayById(id);
  const isChecked: boolean = request?.isChecked!;
  const timeDifference = Date.now() - request!.createdAt.getTime();
  const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;
  const requestsToWithdraw = request?.RequestToWithdraw;

  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
          {
            title: "Request to pay",
            href: `/chapter-two/request-to-pay/${id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-12 *:w-full lg:flex-row lg:gap-4">
        {/* Main div  */}
        <div className=" flex flex-col gap-4 pt-6 *:gap-4 lg:w-3/4">
          <Title title="Request to pay transaction" />

          {/* transaction status  */}
          <div className="flex flex-wrap items-center space-x-2">
            <span className=" font-semibold">Status</span>
            <div
              className={cn(
                " size-3 rounded-full",
                isChecked ? " bg-green-700 " : " bg-blue-700",
              )}
            />
            <span>{isChecked ? "Checked, verified" : "Not checked"}</span>
            <div
              className={cn(
                " size-3 rounded-full bg-red-700",
                isExpired ? " flex" : " hidden",
              )}
            />
            <span className={cn(isExpired ? "flex" : "hidden")}>Timed out</span>
          </div>

          {/* Buttons  */}
          <DeleteTransaction request={request as UpdateRequestToPaySchema} />
          <RequestToPayTransactionStatus request={request!} />
          <BasicUserInfo request={request!} />
          <AccountBalance request={request!} />
          <DeliveryNotification request={request!} />
          <PreApproval request={request!} />
          <PreApprovalStatus request={request!} />
          <RequestToWithdrawV1 request={request!} />
          <RequestToWithdrawV2 request={request!} />
          <RequestToWithdrawTransactionStatus
            requestsToWithdraw={requestsToWithdraw!}
            isExpired={isExpired}
          />

          {/* transaction's params */}
          <div className="flex flex-col items-center gap-4 *:gap-2 lg:hidden">
            <TransactionParams request={request} />
          </div>
        </div>
        {/* side bar div*/}
        <div className="hidden flex-col gap-4 *:gap-2 lg:flex lg:items-center">
          <TransactionParams request={request} />
        </div>
      </div>
    </>
  );
}
