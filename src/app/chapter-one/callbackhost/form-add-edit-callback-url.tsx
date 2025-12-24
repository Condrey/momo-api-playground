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
import { UserData } from "@/lib/types";
import { CallBackUrlSchema, callBackUrlSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useProvideCallbackHostMutation } from "../mutations";

interface FormAddEditCAllbackUrlProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserData | null;
}

export default function FormAddEditCAllbackUrl({
  open,
  setOpen,
  user,
}: FormAddEditCAllbackUrlProps) {
  const form = useForm<CallBackUrlSchema>({
    resolver: zodResolver(callBackUrlSchema),
    defaultValues: {
      momoVariableId: user?.momoVariable?.id || "",
      callbackUrl: user?.momoVariable?.callbackUrl || "",
      callbackHost: user?.momoVariable?.callbackHost || "",
    },
  });
  const { mutate, isPending } = useProvideCallbackHostMutation(user?.id!);

  async function onSubmit(input: CallBackUrlSchema) {
    mutate(input, { onSuccess: () => setOpen(false) });
  }
  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title={"Update your callback host & url "}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"callbackHost"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Callback Host</FormLabel>
                <FormControl>
                  <Input placeholder="Callback host" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Host is in the form: something.com
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"callbackUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Callback URL</FormLabel>
                <FormControl>
                  <Input placeholder="Callback url" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Url is in the form: https://something.com/api/sandbox-callback
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <LoadingButton loading={isPending} type="submit">
              Save Callback Url & Host
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
