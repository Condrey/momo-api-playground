"use client";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { generateIds } from "@/lib/momo-utils/generate-ids";
import { UserData } from "@/lib/types";
import {
  CreateRequestToPaySchema,
  createRequestToPaySchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestToPay } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRequestToPayMutation } from "../mutation";

interface Props {
  open: boolean;
  requestToPay?: RequestToPay;
  setOpen: (open: boolean) => void;
  user: UserData;
}

export default function FormAddEditRequestToPay({
  open,
  setOpen,
  user,
  requestToPay,
}: Props) {
  const generatedIds = generateIds(user.id);
  const form = useForm<CreateRequestToPaySchema>({
    resolver: zodResolver(createRequestToPaySchema),
    defaultValues: {
      amount: requestToPay?.amount || "",
      currency: requestToPay?.currency || "EUR",
      externalId: requestToPay?.externalId || generatedIds[0],
      partyId: requestToPay?.partyId || generatedIds[1],
      payerMessage: requestToPay?.payerMessage || "Some random text",
      payeeNote: requestToPay?.payeeNote || "Please change this text",
    },
  });

  const { mutate, isPending } = useRequestToPayMutation(user.id);
  async function onSubmit(input: CreateRequestToPaySchema) {
    mutate(input, {
      onSuccess: async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast("Created request to pay", {
            description: (
              <pre className="w-full max-w-xs overflow-y-auto">
                {JSON.stringify(
                  {
                    data,
                    status: response.status,
                    statusText: response.statusText,
                  },
                  null,
                  2,
                )}
              </pre>
            ),
            dismissible: false,
          });
        } else {
          toast.error("Failed to create request to pay", {
            description: (
              <pre className="w-full max-w-xs overflow-y-auto">
                {JSON.stringify(
                  {
                    data,
                    status: response.status,
                    statusText: response.statusText,
                  },
                  null,
                  2,
                )}
              </pre>
            ),
            dismissible: false,
          });
        }

        setOpen(false);
      },
    });
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Request to pay</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={"amount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={`Transaction amount ...`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"currency"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">{field.name}</FormLabel>

                  <FormControl>
                    <Input
                      placeholder={"Enter currency in Uppercase...."}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{`Per documentation, use 'EUR'`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"externalId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">External Id</FormLabel>

                  <FormControl>
                    <Input
                      placeholder={`${field.name}...`}
                      {...field}
                      inputMode="numeric"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"partyId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Party Id</FormLabel>

                  <FormControl>
                    <Input
                      placeholder={`${field.name}...`}
                      {...field}
                      inputMode="numeric"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"payerMessage"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Payer Message</FormLabel>
                  <FormControl>
                    <Textarea cols={2} placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"payeeNote"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Payee Note</FormLabel>

                  <FormControl>
                    <Textarea cols={2} placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground text-xs">
                Refresh if button not clickable
              </span>
              <LoadingButton loading={isPending} type="submit">
                Request Payment
              </LoadingButton>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
