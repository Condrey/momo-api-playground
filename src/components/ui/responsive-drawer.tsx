import useMediaQuery from "@/app/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import React from "react";

interface ResponsiveDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  description?: string;
}

export default function ResponsiveDrawer({
  open,
  setOpen,
  title,
  children,
  description,
}: ResponsiveDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="h-auto max-h-dvh overflow-y-auto scroll-smooth  sm:max-w-[425px] md:w-3/4 md:max-w-none lg:w-1/2">
            <DialogHeader className="">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="whitespace-pre-line">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex  flex-col gap-4">{children}</div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="mt-6 max-h-dvh ">
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription className="whitespace-pre-line">
                {description}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex w-full flex-col gap-4 overflow-y-auto scroll-smooth bg-background/10 px-4 pb-12 pt-6">
              {children}
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
