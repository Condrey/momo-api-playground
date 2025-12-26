"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserData } from "@/lib/types";
import {
  CreatePrimaryAndSecondaryKeySchema,
  createPrimaryAndSecondaryKeySchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePrimaryAndSecondaryKeyMutation } from "./mutations";
import { useUserQuery } from "./query";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserData;
}

export default function AddEditPrimaryAndSecondaryKeyForm(props: Props) {
  const { open, setOpen, user } = props;
  const { data } = useUserQuery(user);

  useEffect(() => {
    if (
      data?.momoVariable?.primaryKey === null ||
      data?.momoVariable?.secondaryKey === null
    ) {
      setOpen(true);
    }
  }, [
    setOpen,
    data?.momoVariable?.primaryKey,
    data?.momoVariable?.secondaryKey,
  ]);

  const form = useForm<CreatePrimaryAndSecondaryKeySchema>({
    resolver: zodResolver(createPrimaryAndSecondaryKeySchema),
    values: {
      momoVariableId: data?.momoVariable?.id || "",
      primaryKey: data?.momoVariable?.primaryKey || "",
      secondaryKey: data?.momoVariable?.secondaryKey || "",
    },
  });
  const { mutate, isPending } = usePrimaryAndSecondaryKeyMutation(data!);

  async function onSubmit(input: CreatePrimaryAndSecondaryKeySchema) {
    mutate(input, { onSuccess: () => setOpen(false) });
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>
            {`${data?.momoVariable?.primaryKey === null || data?.momoVariable?.secondaryKey === null ? "Provide Primary & Secondary keys " : "Primary & Secondary keys "}`}
          </SheetTitle>
        </SheetHeader>
        <div className="mx-auto flex w-full max-w-5xl flex-col">
          <div className="flex flex-wrap justify-center gap-2 text-center">
            <span>These keys are found under your profile.</span>
            <Link
              href={`https://momodeveloper.mtn.com/profile`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mtn-blue font-bold underline"
              title="See my Primary and Secondary keys."
            >
              Click here to see <ArrowUpRightIcon className="inline size-3" />
            </Link>
          </div>
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name={"primaryKey"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Key</FormLabel>
                    <FormControl>
                      <Input placeholder="enter primary key here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"secondaryKey"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter secondary key here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <LoadingButton loading={isPending} type="submit">
                  Save
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
