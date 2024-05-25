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
import ResponsiveDrawer from "@/components/ui/responsive-drawer";
import { toast } from "@/components/ui/use-toast";
import {
  UpdateRequestToWithdrawV1Schema,
  updateRequestToWithdrawV1Schema,
} from "@/lib/validation/request-to-withdraw-v1-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestToPay } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setResponseMsg: (responseMsg: string | undefined) => void;
  request: RequestToPay | null;
}

export default function CreateRequestToWithdrawV1Form(props: Props) {
  const { open, setOpen, request, setResponseMsg } = props;
  const router = useRouter();
  const form = useForm<UpdateRequestToWithdrawV1Schema>({
    resolver: zodResolver(updateRequestToWithdrawV1Schema),
    defaultValues: {
      id: request?.id ?? "",
      authorization: request?.accessToken ?? "",
      callbackUrl: request?.callbackUrl ?? "",
      referenceId: request?.referenceId ?? "",
      targetEnvironment: "sandbox",
      primaryKey: request?.primaryKey ?? "",
      payeeNote: request?.payeeNote ?? "",
      externalId: request?.externalId ?? undefined,
      amount: request?.amount ?? "",
      currency: request?.currency ?? "EUR",
      partyId: request?.partyId ?? undefined,
      payerMessage: request?.payerMessage ?? "",
    },
  });

  async function onSubmit(input: UpdateRequestToWithdrawV1Schema) {
    try {
      const body = JSON.stringify(input);
      const response = await fetch("/api/collection/request-to-withdraw-v1", {
        method: "POST",
        body,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMsg(          `{\n"Status":"${response.status}"\n"StatusText":"${response.statusText}"\n}`      );
        toast({
          title: "Request was a success",
          description: response.statusText,
        });
      } else {
        setResponseMsg(
          `{\n"Status":"${response.status}"\n"StatusText":"${response.statusText}"\n}`,
        );

        toast({
          title: "Failed request",
          description: JSON.stringify(response.statusText),
          variant: "destructive",
        });
      }
    } catch (e) {
      console.log("Server Error: ", e);
      toast({
        title: "Server Error",
        description: "Something is wrong with the server, please try again.!",
        variant: "destructive",
      });
    } finally {
      router.refresh();
      setOpen(false);
    }
  }
  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title="Request to withdraw-v1"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Amount</FormLabel>

                <FormControl>
                  <Input placeholder={`Amount..`} {...field} />
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
                <FormLabel className=" uppercase">Currency</FormLabel>

                <FormControl>
                  <Input placeholder={"Currency..."} {...field} />
                </FormControl>
                <FormDescription>{`Per documentation, use 'EUR'`}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"partyId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Party Id</FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Party Id..`}
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
            name={"externalId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">External Id</FormLabel>

                <FormControl>
                  <Input
                    placeholder={`External Id...`}
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
            name={"payeeNote"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Payee Note</FormLabel>

                <FormControl>
                  <Input placeholder="Payee note ..." {...field} />
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
                <FormLabel className=" uppercase">Payer Message</FormLabel>

                <FormControl>
                  <Input placeholder="Payer message ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <span>Refresh if button not clickable</span>
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Create Request to Withdraw
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
