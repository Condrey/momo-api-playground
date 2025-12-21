import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";

type breadCrumbs = { title: string; href: string };
interface Props {
  breadCrumbs: breadCrumbs[];
}

export default function BreadCrumb({ breadCrumbs }: Props) {
  return (
    <div className="mb-5 flex w-full gap-6">
      <SidebarTrigger />
      <div className="flex flex-wrap items-center gap-1">
        {breadCrumbs.map((breadCrumb, index) => (
          <div
            key={breadCrumb.href}
            className="last:text-mtn-blue text-muted-foreground hover:text-primary flex items-center gap-1 text-xl last:pointer-events-none last:font-bold"
          >
            {/* Link */}
            <Link
              href={breadCrumb.href}
              className="line-clamp-1 last:line-clamp-none"
            >
              {breadCrumb.title}
            </Link>
            {/* Separator  */}
            <span
              className={cn(
                index === Math.ceil(breadCrumbs.length - 1) && "hidden",
              )}
            >
              <ChevronRight className="text-foreground/50 size-4" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
