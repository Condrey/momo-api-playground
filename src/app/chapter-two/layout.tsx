import BreadCrumb from "@/components/bread-crumb";
import { Metadata } from "next";
import { Suspense } from "react";
import LayoutSideBar from "./layout-side-bar";

export const metadata: Metadata = {
  title: {
    template: `%s - Collection | MTN MoMo API playground - By Condrey James`,
    absolute: "Collection | MTN MoMo API playground - By Condrey James",
    default: "MTN MoMo API playground - By Condrey James",
  },
  description: `Enable remote collection of bills, fees or taxes.`,
  openGraph: {
    images: [
      "https://lzowhnjutjzukacetzpc.supabase.co/storage/v1/object/public/momo-api-bucket/02-collection.png",
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
        ]}
      />
      <div className="flex flex-col-reverse  gap-4 lg:flex-row ">
        {/* children  */}
        <div className=" flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:w-2/3 lg:p-4 ">
          {children}
        </div>
        {/* side bar information  */}

        <Suspense>
          <LayoutSideBar />
        </Suspense>
      </div>
    </div>
  );
}
