"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import ResponsiveDrawer from "@/components/ui/responsive-drawer";
import { toast } from "@/components/ui/use-toast";
import { createCallbackUrl } from "@/lib/db/actions/primary-and-secondary-key-actions";
import { ServerMessage } from "@/lib/utils";
import {
  CallBackUrlSchema,
  callBackUrlSchema,
} from "@/lib/validation/callback-url-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function AddEditCAllbackUrl(props: Props) {
  const { open, setOpen, user } = props;
  const router = useRouter();

  const form = useForm<CallBackUrlSchema>({
    resolver: zodResolver(callBackUrlSchema),
    defaultValues: {
      callbackUrl: user?.callbackUrl || "",
    },
  });

  async function onSubmit(input: CallBackUrlSchema) {
    try {
      const response: ServerMessage = await createCallbackUrl(input);
      toast({
        title: response.title!,
        description: response.message,
        variant: response.type === "error" ? "destructive" : "default",
      });
    } catch (e) {
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
      title={`${user?.primaryKey === null || user?.secondaryKey === null ? "Add your callback Url" : "Callback Url"}`}
    >
      <Form {...form}>
        <form className="space-y-4  " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"callbackUrl"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Callback url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Save Callback Url
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
