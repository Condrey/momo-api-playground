import BreadCrumb from "@/components/bread-crumb";
import Title from "@/components/title";
import { fetchPaymentById } from "@/lib/db/data/payments-data";
import { cn } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { Metadata } from "next";
import DeletePayment from "../(buttons)/delete-payment";
import PaymentStatus from "../(buttons)/payment-status";
import PaymentParams from "./payment-params";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Payment",
  description:
    "Detailed information of a created payment. Get to know what happens under the hood.",
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { id } = params;
  // fetch payment from the database
  const payment: Payment | null = await fetchPaymentById(id);
  const isChecked: boolean = payment?.isChecked!;
  const timeDifference = Date.now() - payment!.createdAt.getTime();
  const isExpired: boolean = timeDifference > 1 * 1000 * 60 * 60;

  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
          {
            title: "Payment",
            href: `/chapter-two/payments/${id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-12 *:w-full lg:flex-row lg:gap-4">
        {/* Main div  */}
        <div className=" flex flex-col gap-4 pt-6 *:gap-4 lg:w-3/4">
          <Title title="Created Payment" />

          {/* payment status  */}
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
          <DeletePayment payment={payment!} />
          <PaymentStatus payment={payment} />

          {/* payment's params */}
          <div className="flex flex-col items-center gap-4 *:gap-2 lg:hidden">
            <PaymentParams payment={payment} />
          </div>
        </div>
        {/* side bar div*/}
        <div className="hidden flex-col gap-4 *:gap-2 lg:flex lg:items-center">
          <PaymentParams payment={payment} />
        </div>
      </div>
    </>
  );
}
