import BreadCrumb from "@/components/bread-crumb";
import EmptyContainer from "@/components/query-containers/empty-container";
import Title from "@/components/title";
import { Suspense } from "react";
import CreateInvoice from "./(buttons)/create-invoice";
import CreatePayment from "./(buttons)/create-payment";
import { fetchUserByIdWithRequestToPay } from "./actions";
import ChapterTwoSidebar from "./chapter-two-side-bar";
import CreateAccessToken from "./create-access-token/create-access_token";
import RequestToPay from "./request-to-pay/request-to-pay";

export default async function Page() {
  const user = await fetchUserByIdWithRequestToPay();
  if (!user) {
    return <EmptyContainer message={"Please sign in first"}></EmptyContainer>;
  }
  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* children  */}
        <div className="flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:w-2/3 lg:p-4">
          <BreadCrumb
            breadCrumbs={[
              { title: "Home", href: "/" },
              { title: "Collection", href: "/chapter-two" },
            ]}
          />
          <Title
            title="Collection"
            description="Enable remote collection of bills, fees or taxes"
          />
          {/* sidebar components  */}
          <div className="flex max-w-prose lg:hidden">
            <ChapterTwoSidebar user={user} />
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
            <ChapterTwoSidebar user={user} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
