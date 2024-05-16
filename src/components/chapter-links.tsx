"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { BoxIcon, Home, ListStartIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChapterLinks() {
  const pathName = usePathname();
  const links: { label: string; icon: LucideIcon; href: string }[] = [
    { label: "SandBox User Provisioning", icon: BoxIcon, href: "/chapter-one" },
    { label: "Collection", icon: ListStartIcon, href: "/chapter-two" },
  ];
  let isNewPath = false;

  const defaultClassName: ClassValue = `bg-secondary hover:bg-stone-600 md:hover:bg-stone-800 dark:md:hover:bg-stone-800/50 hover:text-stone-50 md:bg-stone-600 dark:md:bg-stone-600/20 md:text-stone-50`;

  const allRefs: string[] = links.map((item) => {
    if (pathName.startsWith(item.href)) {
      isNewPath = false;
    } else {
      true;
    }
    return item.href;
  });

  return (
    <>
      <Link
        title="Home"
        href="/"
        className={cn(
          pathName === "/" || isNewPath
            ? "bg-amber-300 dark:text-slate-950"
            : defaultClassName,
        )}
      >
        <Home />
        Home
      </Link>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            aria-disabled
            key={link.href}
            title={link.label}
            href={link.href}
            className={cn(
              pathName.startsWith(link.href) && pathName !== "/"
                ? "bg-amber-300 dark:text-slate-950"
                : defaultClassName,
            )}
          >
            <Icon />
            <span className="line-clamp-1 text-ellipsis"> {link.label}</span>
          </Link>
        );
      })}
    </>
  );
}
