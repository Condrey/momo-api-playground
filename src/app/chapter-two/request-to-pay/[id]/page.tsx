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

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Request to pay",
  description: "Detailed information of request to pay",
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
        <span className={cn(isExpired ? "visible" : "hidden")}>Timed out</span>
      </div>

      {/* Buttons  */}
      <DeleteTransaction request={request as UpdateRequestToPaySchema} />
      <TransactionStatus request={request!} />
      <PreApproval request={request!} />

      {/* transaction's params */}
      <TransactionParams request={request} />
    </>
  );
}
