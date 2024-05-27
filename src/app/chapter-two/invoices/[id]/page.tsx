import BreadCrumb from "@/components/bread-crumb";
import Title from "@/components/title";
import { cn } from "@/lib/utils";
import { Invoice } from "@prisma/client";
import { Metadata } from "next";
import InvoiceParams from "./invoice-params";
import { fetchInvoiceById } from "@/lib/db/data/invoices-data";
import DeleteInvoice from "../(buttons)/delete-invoice";
import InvoiceStatus from "../(buttons)/invoice-status";
import CancelInvoice from "../(buttons)/cancel-invoice";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Invoice",
  description:
    "Detailed information of a created invoice. Get to know what happens under the hood.",
};

export default async function Page({ params }: Props) {
  const { id } = params;
  // fetch invoice from the database
  const invoice: Invoice | null = await fetchInvoiceById(id);
  const isChecked: boolean = invoice?.isChecked!;
  const isCancelled: boolean = invoice?.isCancelled!;
  const timeDifference = Date.now() - invoice!.createdAt.getTime();
  const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;

  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
          {
            title: "Invoice",
            href: `/chapter-two/invoices/${id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-12 *:w-full lg:flex-row lg:gap-4">
        {/* Main div  */}
        <div className=" flex flex-col gap-4 pt-6 *:gap-4 lg:w-3/4">
          <Title title="Created Invoice" />

          {/* invoice status  */}
          <div className="flex flex-wrap items-center space-x-2">
            <span className=" font-semibold">Status</span>
            {/* checked */}
            <div
              className={cn(
                " size-3 rounded-full",
                isChecked ? " bg-green-700 " : " bg-blue-700",
              )}
            />
            <span>{isChecked ? "Checked, verified" : "Not checked"}</span>
            {/* Cancelled  */}
            <div
              className={cn(
                " size-3 rounded-full bg-fuchsia-700",
                isCancelled ? " flex" : " hidden",
              )}
            />
            <span className={cn(isCancelled ? "flex" : "hidden")}>
              Cancelled
            </span>
            {/* Timed out  */}
            <div
              className={cn(
                " size-3 rounded-full bg-red-700",
                isExpired ? " flex" : " hidden",
              )}
            />
            <span className={cn(isExpired ? "flex" : "hidden")}>Timed out</span>
          </div>

          {/* Buttons  */}
          <DeleteInvoice invoice={invoice!} />
          <CancelInvoice invoice={invoice!} />
          <InvoiceStatus invoice={invoice} />

          {/* invoice's params */}
          <div className="flex flex-col items-center gap-4 *:gap-2 lg:hidden">
            <InvoiceParams invoice={invoice} />
          </div>
        </div>
        {/* side bar div*/}
        <div className="hidden flex-col gap-4 *:gap-2 lg:flex lg:items-center">
          <InvoiceParams invoice={invoice} />
        </div>
      </div>
    </>
  );
}
