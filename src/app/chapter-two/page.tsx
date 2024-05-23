import ProductTitleContainer from "@/components/product-title-container";
import {
  fetchUserById,
  fetchUserByIdWithRequestToPay,
} from "@/lib/db/data/user-data";
import CreateAccessToken from "./(buttons)/create-access_token";
import RequestToPay from "./(buttons)/request-to-pay";
import { User } from "@prisma/client";
import BreadCrumb from "@/components/bread-crumb";
import LayoutSideBar from "./layout-side-bar";
import { Suspense } from "react";

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
