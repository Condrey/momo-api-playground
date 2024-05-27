"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { generateIds } from "@/lib/momo-utils/generate-ids";
import {
  CreatePaymentsSchema,
  createPaymentsSchema,
} from "@/lib/validation/payments-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function CreatePaymentForm(props: Props) {
  const { open, setOpen, user } = props;
  const router = useRouter();
  const randomIds = generateIds(user?.id!);
  const form = useForm<CreatePaymentsSchema>({
    resolver: zodResolver(createPaymentsSchema),
    defaultValues: {
      primaryKey: user?.primaryKey ?? "",
      authorization: user?.accessToken ?? "",
      callbackUrl: user?.callbackUrl ?? "",
      referenceId: user?.referenceId ?? "",
      targetEnvironment: "sandbox",

      externalTransactionId: randomIds[0],
      amount: "",
      currency: "EUR",
      customerReference: "46070911111",
      serviceProviderUserName: " Electricity Inc.",
      couponId: undefined,
      productId: undefined,
      productOfferingId: undefined,
      receiverMessage: undefined,
      senderNote: undefined,
      maxNumberOfRetries: undefined,
      includeSenderCharges: false,
    },
  });

  async function onSubmit(input: CreatePaymentsSchema) {
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
        //Now you can create payment
        const editedInput: CreatePaymentsSchema = {
          ...input,
          authorization: data.message.access_token,
        };
        const body = JSON.stringify(editedInput);
        const response = await fetch("/api/collection/create-payments", {
          method: "POST",
          body,
        });

        if (response.ok) {
          toast({
            title: "Payment Created",
            description: `${response.statusText}`,
          });
        } else {
          toast({
            title: "Failed to create payment",
            description: JSON.stringify(response.statusText),
            variant: "destructive",
          });
        }
      } else {
        console.error("Error getting accessToken: ");
        throw new Error("Error getting accessToken");
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
    <ResponsiveDrawer open={open} setOpen={setOpen} title="Create Payment">
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
            name={"externalTransactionId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  External Transaction Id
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder={`External Transaction Id...`}
                    {...field}
                    inputMode="numeric"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  An external transaction id to tie to the payment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"customerReference"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Customer Reference</FormLabel>

                <FormControl>
                  <Input placeholder="Customer Reference ..." {...field} />
                </FormControl>
                <FormDescription>
                  A customer reference for a provider. Example: +46070911111
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"serviceProviderUserName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  Service Provider UserName
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Service Provider UserName...`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A service provider name. Example: Electricity Inc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"couponId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Coupon Id</FormLabel>

                <FormControl>
                  <Input placeholder={`Coupon Id...`} {...field} />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  A coupon the user would like to redeem and use the reward as
                  part of this payment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"productId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Product Id</FormLabel>

                <FormControl>
                  <Input placeholder={`Product Id...`} {...field} />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  Id of a product, used if paying for a product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"productOfferingId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  Product Offering Id
                </FormLabel>

                <FormControl>
                  <Input placeholder={`Product offering Id...`} {...field} />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  Id of a product offering, used when paying for a particular
                  offering of a product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"receiverMessage"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Receiver message</FormLabel>

                <FormControl>
                  <Input placeholder={`Receiver message...`} {...field} />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  A descriptive note for receiver transaction history.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"senderNote"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">Sender note</FormLabel>

                <FormControl>
                  <Input placeholder={`Sender note...`} {...field} />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  A descriptive note for sender transaction history.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"maxNumberOfRetries"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  Maximum number of retries
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder={`Maximum number of retries...`}
                    inputMode="numeric"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className='before:content-["Optional:_"]'>
                  value
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"includeSenderCharges"}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className=" uppercase">
                    Include Sender charges
                  </FormLabel>
                  <FormDescription>
                    Specifies if sender charges, this is, fee and tax paid by
                    the sender, should be included in the specified transaction
                    amount. This means that the charges will be deducted from
                    the transaction amount before the remaining amount is
                    transferred to the receiver.True indicates that charges
                    shall be included in the specified transaction amount. The
                    default value is false, meaning that sender charges are
                    charged on top of the transaction amount.{" "}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <span>Refresh if button not clickable</span>
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Create Payment
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
