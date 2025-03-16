'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

export interface HeaderContainerBreadCrumb {
    label: string;
    url?: string;
  }
  interface HeaderContainerProps {
    breadCrumbs?: HeaderContainerBreadCrumb[];
    className?: string;
    children?: React.ReactNode;
  }

  export default function HeaderContainer({breadCrumbs=[],children,className}:HeaderContainerProps){
    const breadCrumbItems: HeaderContainerBreadCrumb[] = [
        { label: "Home", url: "" },
        ...breadCrumbs,
      ];

      return    <div className={cn("mx-auto w-full max-w-[80rem]", className)}>
      {children}
      <header
        className={cn(
          "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        )}
      >
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadCrumbItems.length === 1 ? (
                <BreadcrumbItem className="block">
                  <BreadcrumbPage>{breadCrumbItems[0].label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  {breadCrumbItems.map((item, index, array) => (
                    <div key={item.label} className="flex items-center gap-0.5">
                      <BreadcrumbItem className="block gap-0">
                        {index === array.length - 1 ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLinkItem
                            basePathName={'/'}
                            item={item}
                          />
                        )}
                      </BreadcrumbItem>
                      {index !== array.length - 1 && (
                        <BreadcrumbSeparator className="mx-0 block px-0" />
                      )}
                    </div>
                  ))}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </div>
  }

  
interface BreadcrumbLinkItemProps {
    basePathName: string;
    item: HeaderContainerBreadCrumb;
  }
  function BreadcrumbLinkItem({ basePathName, item }: BreadcrumbLinkItemProps) {
    const searchParams = useSearchParams();
  
    const [isPending, startTransition] = useTransition();
    return (
      <BreadcrumbLink asChild>
        <Button
          asChild
          variant={"link"}
          onClick={() => startTransition(() => {})}
          className={cn(
            "flex max-w-40 items-center justify-start text-start lg:max-w-48",
            isPending &&
              "animate-pulse rounded-md bg-accent text-accent-foreground",
          )}
        >
          <Link
            href={basePathName + item.url + "?" + searchParams.toString()}
            className={cn("w-fit", "break-word line-clamp-1 text-ellipsis")}
          >
            {item.label}
          </Link>
        </Button>
      </BreadcrumbLink>
    );
  }
  
  export function HeaderContainerFallback() {
    return (
      <div className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <Skeleton className="size-6" />
        <Skeleton className="h-6 w-1" />
        <Skeleton className="h-6 w-28" />
        <BreadcrumbSeparator className="block" />
        <Skeleton className="h-6 w-56" />
        <BreadcrumbSeparator className="block" />
        <Skeleton className="h-6 w-64" />
      </div>
    );
  }