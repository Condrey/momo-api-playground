import { fetchUserById } from "@/lib/db/data/user-data";
import { MessageCircleIcon, PhoneCallIcon } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import UserToggle from "./user-toggle";

export default async function Header() {
  const phoneNumber = "+256776239674";
  const user = await fetchUserById();

  return (
    <div className="max-w-9xl px-3 bg-mtn-blue mx-auto flex flex-col sm:flex-row w-full items-center justify-between sm:gap-4">
      <h1 className=" line-clamp-2 text-lg font-bold tracking-tighter sm:text-2xl lg:text-3xl">
        <span className="text-primary"> MTN MoMo API playground </span>
        <span> - By Coundrey James</span>
      </h1>
      <div className="bg-secondary/20 flex ms-auto items-center gap-2 rounded-3xl border px-1.5 py-1 text-sm">
        <Button size={"icon"} asChild>
          <Link href={`tel:${phoneNumber}`}>
            <PhoneCallIcon />
          </Link>
        </Button>
        <Button size={"icon"} asChild>
          <Link
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="no-referrer"
            className="rounded-full bg-linear-to-br from-green-950 to-green-800 hover:bg-linear-to-bl dark:from-green-700 dark:to-green-500"
          >
            <MessageCircleIcon className="text-green-50" />
          </Link>
        </Button>
        <ThemeToggle />
        <SessionProvider>
          <UserToggle user={user} />
        </SessionProvider>
      </div>
    </div>
  );
}
