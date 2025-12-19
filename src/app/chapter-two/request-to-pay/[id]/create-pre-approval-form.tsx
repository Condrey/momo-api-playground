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
import {
  UpdatePreApprovalSchema,
  updatePreApprovalSchema
} from "@/lib/validation/pre-approval-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestToPay } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setResponseMsg: (responseMsg: string | undefined) => void;
  request: RequestToPay | null;
}

export default function CreatePreApprovalForm(props: Props) {
  const { open, setOpen, request, setResponseMsg } = props;
  const router = useRouter();
  const form = useForm<UpdatePreApprovalSchema>({
    resolver: zodResolver(updatePreApprovalSchema),
    defaultValues: {
      id: request?.id ?? "",
      authorization: request?.accessToken ?? "",
      callbackUrl: request?.callbackUrl ?? "",
      referenceId: request?.referenceId ?? "",
      targetEnvironment: "sandbox",
      primaryKey: request?.primaryKey ?? "",
      partyId: request?.partyId ?? undefined,
      payerCurrency: request?.currency ?? "EUR",
      payerMessage: request?.payerMessage ?? "",
      validityTime: undefined,
    },
  });

  async function onSubmit(input: UpdatePreApprovalSchema) {
    try {
      const body = JSON.stringify(input);
      const response = await fetch("/api/collection/pre-approval", {
        method: "POST",
        body,
      });

      if (response.ok) {
        setResponseMsg(
          `{\n"Status":"${response.status}"\n"StatusText":"${response.statusText}"\n}`,
        );
        toast("Request was a success",{
          description: `Accepted`,
        });
      } else {
        setResponseMsg(
          `{\n"Status":"${response.status}"\n"StatusText":"${response.statusText}"\n}`,
        );

        toast.error("Failed request",{
          description: JSON.stringify(response.statusText),
        });
      }
    } catch (e) {
      console.log("Server Error: ", e);
      toast.error("Server Error",{
        description: "Something is wrong with the server, please try again.!",
      });
    } finally {
      router.refresh();
      setOpen(false);
    }
  }
  return (
    <ResponsiveDrawer open={open} setOpen={setOpen} title="Pre-Approval">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"partyId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Party Id</FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Party Id...`}
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
            name={"payerCurrency"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Payer currency</FormLabel>

                <FormControl>
                  <Input placeholder={"Payer currency..."} {...field} />
                </FormControl>
                <FormDescription>{`Per documentation, use 'EUR'`}</FormDescription>
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

          <FormField
            control={form.control}
            name={"validityTime"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Validity time</FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Validity time...`}
                    {...field}
                    inputMode="numeric"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-4">
            <span>Refresh if button not clickable</span>
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Create Pre-Approval
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
