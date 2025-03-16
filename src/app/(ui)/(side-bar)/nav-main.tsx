"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon, ServerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SubItem {
  title: string;
  url: string;
  showIndicator: boolean;
}

export function NavMain() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive: boolean;
    items: SubItem[];
  }[] = [
    {
      title: "Sand box environment",
      url: "/",
      icon: ServerIcon,
      isActive: true,
      items: [
        {
          title: "Sandbox user provisioning",
          url: "chapter-one",
          showIndicator: false,
        },
        {
          title: "Collection",
          url: "chapter-two",
          showIndicator: false,
        },
        {
          title: "Disbursement",
          url: "chapter-three",
          showIndicator: false,
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const ItemIcon = item.icon;

          const baseUrl = "/" + item.url;
          const isActive = item.items.some((i) => pathname.startsWith(baseUrl));
          const initialSubItem = item.items[0];
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className={cn("group/collapsible")}
            >
              <SidebarMenu>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    asChild
                  >
                    <Link href={baseUrl + "?" + searchParams.toString()}>
                      <ItemIcon />
                      <span
                        className={cn(
                          isActive && "font-semibold",
                          "line-clamp-1 text-ellipsis break-words",
                        )}
                      >
                        {item.title}
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isChildActive = pathname.startsWith(
                        baseUrl + subItem.url,
                      );
                      return (
                        <SubmenuItem
                          baseUrl={baseUrl}
                          isActive={isChildActive}
                          subItem={subItem}
                          key={subItem.title}
                        />
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenu>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

interface SubmenuItemProps {
  subItem: SubItem;
  baseUrl: string;
  isActive: boolean;
}
function SubmenuItem({ subItem, baseUrl, isActive }: SubmenuItemProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <SidebarMenuSubItem key={subItem.title}>
      <SidebarMenuSubButton
        asChild
        isActive={isActive}
        onClick={() => startTransition(() => {})}
        className={cn(
          isPending &&
            "bg-sidebar-accent text-sidebar-accent-foreground animate-pulse",
        )}
      >
        <Link
          href={'/' + subItem.url + "?" + searchParams.toString()}
          className="flex w-full"
        >
          <span className={cn(isActive && "font-semibold")}>
            {subItem.title}
          </span>
          <span
            className={cn(
              "top-0 size-2 flex-none -translate-x-1/2 rounded-full bg-destructive",
              !subItem.showIndicator && "hidden",
            )}
          />{" "}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
