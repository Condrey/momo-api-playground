"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BoxIcon,
  ListStartIcon,
  Loader2Icon,
  LucideIcon,
  Network,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

type NavLink = { label: string; icon: LucideIcon; href: string };
const navLinks: NavLink[] = [
  { label: "SandBox User Provisioning", icon: BoxIcon, href: "/chapter-one" },
  { label: "Collection", icon: ListStartIcon, href: "/chapter-two" },
  { label: "Disbursement", icon: Network, href: "/chapter-three" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="not-only:bg-primary top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <div className="mx-auto w-full max-w-fit p-4">
          <Image
            src="/momo-logo2.png"
            alt="logo"
            width={150}
            height={150}
            className="rounded-none"
          />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup className="space-y-2 px-2">
          <SidebarGroupLabel className="text-lg">
            Sand box Environment
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-3">
            {navLinks.map((link, index) => (
              <MenuItem key={index} item={link} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function MenuItem({ item }: { item: NavLink }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const isActive = pathname.startsWith(item.href) && pathname !== "/";
  const Icon = item.icon;
  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton
        variant={"default"}
        size={"lg"}
        title={item.label}
        onClick={() => startTransition(() => {})}
        isActive={isActive}
        className={cn(
          "h-auto rounded-full px-3 py-2 text-lg [&>svg]:size-6",
          isActive && "pointer-events-none",
        )}
        asChild
      >
        <Link href={item.href} className="flex h-fit gap-2 py-1">
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Icon className="size-4" />
          )}
          <span className="line-clamp-1"> {item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
