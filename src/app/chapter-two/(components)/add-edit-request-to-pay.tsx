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
import { generateIds } from "@/lib/momo-utils/generate-ids";
import {
  CreateRequestToPaySchema,
  createRequestToPaySchema,
} from "@/lib/validation/request-to-pay-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function AddEditRequestToPay(props: Props) {
  const { open, setOpen, user } = props;
  const router = useRouter();
  const generatedIds = generateIds(user?.id!);
  const form = useForm<CreateRequestToPaySchema>({
    resolver: zodResolver(createRequestToPaySchema),
    defaultValues: {
      accessToken: user?.accessToken || "",
      callbackUrl: user?.callbackUrl || "",
      referenceId: user?.referenceId || "",
      targetEnvironment: "sandbox",
      primaryKey: user?.primaryKey || "",
      amount: "",
      currency: "EUR",
      externalId: generatedIds[0],
      partyId: generatedIds[1],
      payerMessage: "Some random text",
      payeeNote: "Please change this text",
    },
  });

  async function onSubmit(input: CreateRequestToPaySchema) {
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
        //Now you can request to pay
        const editedInput:CreateRequestToPaySchema = {...input,accessToken: data.message.access_token}
        const body = JSON.stringify(editedInput);
        const response = await fetch("/api/collection/request-to-pay", {
          method: "POST",
          body,
        });

        if (response.ok) {
          if (response.status === 500) {
            const data = await response.json();
            toast({
              title: "Request was a success",
              description: `${data.statusText}`,
            });
          } else {
            const data = await response.json();
            toast({
              title: "Request was a success",
              description: `${data.message}`,
            });
          }
        } else {
          const data = response.status;

          console.log("No Ok data:", data);

          toast({
            title: "Failed request",
            description: JSON.stringify(response.statusText),
            variant: "destructive",
          });
        }
      } else {
        console.error("Error getting accessToken: ", accessTokenResponse);
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
    <ResponsiveDrawer open={open} setOpen={setOpen} title="Request to pay">
      <Form {...form}>
        <form className="space-y-4  " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">{field.name}</FormLabel>
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
                <FormLabel className=" uppercase">{field.name}</FormLabel>

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
                <FormLabel className=" uppercase">External Id</FormLabel>

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
                <FormLabel className=" uppercase">Party Id</FormLabel>

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
                <FormLabel className=" uppercase">Payer Message</FormLabel>

                <FormControl>
                  <Input placeholder={field.name} {...field} />
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
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Request Payment
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
