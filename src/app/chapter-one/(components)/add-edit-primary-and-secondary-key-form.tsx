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
import { createPrimaryAndSecondaryKey } from "@/lib/db/actions/primary-and-secondary-key-actions";
import { ServerMessage } from "@/lib/utils";
import {
  CreatePrimaryAndSecondaryKeySchema,
  createPrimaryAndSecondaryKeySchema,
} from "@/lib/validation/primary-and-secondary-key-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}

export default function AddEditPrimaryAndSecondaryKeyForm(props: Props) {
  const { open, setOpen, user } = props;
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryKey === null || user?.secondaryKey === null) {
      setOpen(true);
    }
  }, [setOpen, user?.primaryKey, user?.secondaryKey]);

  const form = useForm<CreatePrimaryAndSecondaryKeySchema>({
    resolver: zodResolver(createPrimaryAndSecondaryKeySchema),
    defaultValues: {
      primaryKey: user?.primaryKey || "",
      secondaryKey: user?.secondaryKey || "",
    },
  });

  async function onSubmit(input: CreatePrimaryAndSecondaryKeySchema) {
    try {
      const response: ServerMessage = await createPrimaryAndSecondaryKey(input);
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
      title={`${user?.primaryKey === null || user?.secondaryKey === null ? "Provide Primary & Secondary keys " : "Primary & Secondary keys "}`}
    >
      <div className="flex gap-2">
        <span>These keys are found under your profile.</span>
        <a
          href={`https:momodeveloper.mtn.com/profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-amber-600"
          title="See my Primary and Secondary keys."
        >
          Click here to see
        </a>
      </div>
      <Form {...form}>
        <form className="space-y-4  " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"primaryKey"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Primary key" {...field} />
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
                <FormControl>
                  <Input placeholder="Secondary key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
