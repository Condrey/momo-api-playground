import { cn } from "@/lib/utils";
import { ChevronRight, SeparatorHorizontal } from "lucide-react";
import Link from "next/link";

type breadCrumbs = { title: string; href: string };
interface Props {
  breadCrumbs: breadCrumbs[];
}

export default function BreadCrumb({ breadCrumbs }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-1 ">
        {breadCrumbs.map((breadCrumb, index) => (
          <div
            key={breadCrumb.href}
            className="flex items-center gap-1 last:pointer-events-none last:font-bold last:text-amber-500 hover:text-amber-500 dark:last:text-amber-300 dark:hover:text-amber-300"
          >
            {/* Link */}
            <Link
              href={breadCrumb.href}
              className=" line-clamp-1 last:line-clamp-none"
            >
              {breadCrumb.title}
            </Link>
            {/* Separator  */}
            <span
              className={cn(
                index === Math.ceil(breadCrumbs.length - 1) && "hidden",
              )}
            >
              <ChevronRight className="size-4 text-foreground/50" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
