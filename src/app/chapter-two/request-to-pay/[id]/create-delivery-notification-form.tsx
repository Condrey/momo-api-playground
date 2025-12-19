"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import ResponsiveDrawer from "@/components/ui/responsive-drawer";
import {
  CreateDeliveryNotificationSchema,
  createDeliveryNotificationSchema,
} from "@/lib/validation/delivery-notification-validation";
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

export default function CreateDeliveryNotificationForm(props: Props) {
  const { open, setOpen, request, setResponseMsg } = props;
  const router = useRouter();
  const form = useForm<CreateDeliveryNotificationSchema>({
    resolver: zodResolver(createDeliveryNotificationSchema),
    defaultValues: {
      id: request?.id ?? "",
      referenceId: request?.referenceId ?? "",
      authorization: request?.accessToken ?? "",
      targetEnvironment: request?.targetEnvironment ?? "",
      primaryKey: request?.primaryKey ?? "",
      language: "en",
      notificationMessage:
        "Thank you for supporting MoMo Playground. Please continue with the transaction.",
    },
  });

  async function onSubmit(input: CreateDeliveryNotificationSchema) {
    try {
      const body = JSON.stringify(input);
      const response = await fetch("/api/collection/delivery-notification", {
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
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title="Create delivery notification"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"notificationMessage"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">
                  Notification Message
                </FormLabel>

                <FormControl>
                  <Input placeholder={`Notification message...`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"language"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" uppercase">{field.name}</FormLabel>

                <FormControl>
                  <Input placeholder={`Language...`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <span>Refresh if button not clickable</span>
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Create Notification
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
