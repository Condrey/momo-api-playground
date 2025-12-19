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
import { generateIds } from "@/lib/momo-utils/generate-ids";
import {
  CreateInvoicesSchema,
  createInvoicesSchema,
} from "@/lib/validation/invoices-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function CreateInvoiceForm(props: Props) {
  const { open, setOpen, user } = props;
  const router = useRouter();
  const randomIds = generateIds(user?.id!);
  const form = useForm<CreateInvoicesSchema>({
    resolver: zodResolver(createInvoicesSchema),
    defaultValues: {
      primaryKey: user?.primaryKey ?? "",
      authorization: user?.accessToken ?? "",
      callbackUrl: user?.callbackUrl ?? "",
      referenceId: user?.referenceId ?? "",
      targetEnvironment: "sandbox",

      externalId: randomIds[0],
      amount: "",
      currency: "EUR",
      validityDuration: undefined,
      intendedPayerPartyId: undefined,
      payeePartyId: undefined,
      description: undefined,
    },
  });

  async function onSubmit(input: CreateInvoicesSchema) {
    try {
      // first create an access token
      const accessTokenResponse = await fetch(
        "/api/provisioning/create-access-token",
        {
          method: "POST",
          body: JSON.stringify({
            primaryKey: user?.primaryKey ?? "",
            authorization: user?.authorization ?? "",
          }),
        },
      );
      if (accessTokenResponse.ok) {
        const data = await accessTokenResponse.json();
        //Now you can create invoice
        const editedInput: CreateInvoicesSchema = {
          ...input,
          authorization: data.message.access_token,
        };
        const body = JSON.stringify(editedInput);
        const response = await fetch("/api/collection/create-invoice", {
          method: "POST",
          body,
        });

        if (response.ok) {
          toast("Invoice Created", {
            description: `${response.statusText}`,
          });
        } else {
          toast.error("Failed to create invoice", {
            description: JSON.stringify(response.statusText),
          });
        }
      } else {
        console.error("Error getting accessToken: ");
        throw new Error("Error getting accessToken");
      }
    } catch (e) {
      console.log("Server Error: ", e);
      toast.error("Server Error", {
        description: "Something is wrong with the server, please try again.!",
      });
    } finally {
      router.refresh();
      setOpen(false);
    }
  }
  return (
    <ResponsiveDrawer open={open} setOpen={setOpen} title="Create Invoice">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Amount</FormLabel>

                <FormControl>
                  <Input placeholder={`Amount...`} {...field} />
                </FormControl>
                <FormDescription>
                  Amount that will be debited from the payer account.
                </FormDescription>
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
                <FormDescription>
                  External id is used as a reference to the transaction.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"validityDuration"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Validity duration</FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Validity duration...`}
                    {...field}
                    inputMode="numeric"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"intendedPayerPartyId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  Intended Payer Party Id
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Party Id for intended payer ..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className='before:content-["MSISDN:_"]'>
                  Mobile Number validated according to ITU-T E.164.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"payeePartyId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Payee Party Id</FormLabel>

                <FormControl>
                  <Input placeholder="Party Id for the payee ..." {...field} />
                </FormControl>
                <FormDescription className='before:content-["MSISDN:_"]'>
                  Mobile Number validated according to ITU-T E.164.{" "}
                </FormDescription>
                <FormMessage />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Description</FormLabel>

                <FormControl>
                  <Input placeholder="description..." {...field} />
                </FormControl>
                <FormDescription>
                  Message that will be written in the payer transaction history
                  message field.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <span>Refresh if button not clickable</span>
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Create Invoice
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
