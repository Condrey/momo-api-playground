import { PhoneCall } from "lucide-react";
import Link from "next/link";
import UserToggle from "./user-toggle";
import { SessionProvider } from "next-auth/react";
import { fetchUserById } from "@/lib/db/data/user-data";

export default async function Header() {
  const phoneNumber = "+256776239674";
  const user = await fetchUserById();

  return (
    <div className="flex w-full flex-col gap-4 pb-6">
      <div className="text-3xl font-bold text-amber-500 ">
        <div className="float-right text-sm">
          <SessionProvider>
            <UserToggle user={user} />
          </SessionProvider>
        </div>
        <span>MTN MOMO API PLAYGROUND</span>
        <span className="text-foreground"> - BY CONDREY JAMES</span>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4  font-bold *:flex *:justify-start *:gap-2">
        <Link href={`tel:${phoneNumber}`} className="hover:text-amber-500">
          <PhoneCall />
          +256 776 239 674
        </Link>
        <Link
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="no-referrer"
          className=" rounded-full bg-gradient-to-br from-green-950 to-green-800 px-12 py-2 text-green-50 hover:bg-gradient-to-bl  "
        >
          Chat with me on WhatsApp
        </Link>
      </div>
      <hr className="w-full" />
    </div>
  );
}
