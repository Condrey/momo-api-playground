import { Metadata } from "next";

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
  return <div className="flex flex-col gap-4">{children}</div>;
}
