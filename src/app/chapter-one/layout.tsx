import BreadCrumb from "@/components/bread-crumb";
import { Metadata } from "next";
import { Suspense } from "react";
import LayoutSideBar from "./layout-side-bar";

export const metadata: Metadata = {
  title: {
    template: `%s - SandBox User Provisioning Tool | MTN MoMo API playground - By Condrey James`,
    absolute:
      "SandBox User Provisioning Tool | MTN MoMo API playground - By Condrey James",
    default: "MTN MoMo API playground - By Condrey James",
  },
  description: `Create Sandbox user, verify if user exists, and create an Api key`,
  openGraph: {
    images: [
      "https://lzowhnjutjzukacetzpc.supabase.co/storage/v1/object/public/momo-api-bucket/04.%20sandbox%20user%20provisioning%20tool.png",
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Sandbox user provisioning", href: "/chapter-one" },
        ]}
      />
      <div className="flex flex-col-reverse  gap-4 lg:flex-row ">
        {/* children  */}
        <div className=" flex w-full flex-col gap-4 *:before:pr-2 *:before:text-2xl *:before:font-bold lg:w-2/3 lg:p-4 ">
          {children}
        </div>
        {/* side bar information  */}
        <div className="hidden lg:flex">
<Suspense>
          <LayoutSideBar />
        </Suspense>
</div>
      </div>
    </div>
  );
}
