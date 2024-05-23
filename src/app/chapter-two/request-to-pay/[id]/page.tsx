import BreadCrumb from "@/components/bread-crumb";
import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import Title from "@/components/title";
import { fetchRequestToPayById } from "@/lib/db/data/request-to-pay-data";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import TransactionParams from "./transaction-params";
import DeleteTransaction from "../(buttons)/delete-transaction";
import { UpdateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import TransactionStatus from "../(buttons)/transaction-status";
import { RequestToPay } from "@prisma/client";
import PreApproval from "../(buttons)/pre-approval";
import PreApprovalStatus from "../(buttons)/pre-approval-status";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Request to pay",
  description:
    "Detailed information of request to pay. Get to know what happens under the hood.",
};

export default async function Page({ params }: Props) {
  const { id } = params;
  // fetch the request to pay from the database
  const request: RequestToPay | null = await fetchRequestToPayById(id);
  const isChecked: boolean = request?.isChecked!;
  const timeDifference = Date.now() - request!.createdAt.getTime();
  const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;

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
      <div className="flex flex-col gap-4 *:w-full lg:flex-row">
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
                isExpired ? " visible" : " invisible",
              )}
            />
            <span className={cn(isExpired ? "visible" : "hidden")}>
              Timed out
            </span>
          </div>

          {/* Buttons  */}
          <DeleteTransaction request={request as UpdateRequestToPaySchema} />
          <TransactionStatus request={request!} />
          <PreApproval request={request!} />
          <PreApprovalStatus request={request!} />

          {/* transaction's params */}
          <div className="flex flex-col items-center gap-4 *:gap-2 lg:hidden">
            <TransactionParams request={request} />
          </div>
        </div>
        {/* side bar div*/}
        <div className="hidden flex-col items-center gap-4 *:gap-2 lg:flex">
          <TransactionParams request={request} />
        </div>
      </div>
    </>
  );
}
