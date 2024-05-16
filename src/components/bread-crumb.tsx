import { cn } from "@/lib/utils";
import { ChevronRight, SeparatorHorizontal } from "lucide-react";
import Link from "next/link";

type breadCrumbs = { title: string; href: string };
interface Props {
  breadCrumbs: breadCrumbs[];
}

export default function BreadCrumb({ breadCrumbs }: Props) {
  return (
    <><div className="flex gap-1 items-center flex-wrap ">
    {breadCrumbs.map((breadCrumb, index) => (
      <div
        key={breadCrumb.href}
        className="flex gap-1 items-center last:text-amber-500 dark:last:text-amber-300 hover:text-amber-500 dark:hover:text-amber-300 last:pointer-events-none last:font-bold"
      >
        {/* Link */}
        <Link href={breadCrumb.href} className=" line-clamp-1 last:line-clamp-none">{breadCrumb.title}</Link>
        {/* Separator  */}
        <span
          className={cn(
            index === Math.ceil(breadCrumbs.length - 1) && "hidden"
          )}
        >
          <ChevronRight className="size-4 text-foreground/50"/>
        </span>
      </div>
    ))}
  </div></>
  );
}
