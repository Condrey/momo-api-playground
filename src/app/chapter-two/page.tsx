import BreadCrumb from "@/components/bread-crumb";
import ProductTitleContainer from "@/components/product-title-container";
import { fetchUserByIdWithRequestToPay } from "@/lib/db/data/user-data";
import { Suspense } from "react";
import CreateAccessToken from "./(buttons)/create-access_token";
import CreatePayment from "./(buttons)/create-payment";
import RequestToPay from "./(buttons)/request-to-pay";
import LayoutSideBar from "./layout-side-bar";
import CreateInvoice from "./(buttons)/create-invoice";

export default async function Page() {
  const user = await fetchUserByIdWithRequestToPay();

  return (
    <>
      <div className="flex flex-col-reverse  gap-4 lg:flex-row ">
        {/* children  */}
        <div className=" flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:w-2/3 lg:p-4 ">
          <BreadCrumb
            breadCrumbs={[
              { title: "Home", href: "/" },
              { title: "Collection", href: "/chapter-two" },
            ]}
          />
          <ProductTitleContainer productTitle="Collection" />
          {/* sidebar components  */}
          <div className="flex max-w-prose lg:hidden">
            <LayoutSideBar />
          </div>

          {/* Main components */}
          <CreateAccessToken user={user} />
          <RequestToPay user={user} />
          <CreatePayment user={user!} />
          <CreateInvoice user={user!} />
        </div>
        {/* side bar information  */}
        <div className="hidden lg:flex">
          <Suspense>
            <LayoutSideBar />
          </Suspense>
        </div>
      </div>
    </>
  );
}
