"use client";

import { UserData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCallbackUrl, createPrimaryAndSecondaryKey } from "./actions";

export const usePrimaryAndSecondaryKeyMutation = (user: UserData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPrimaryAndSecondaryKey,
    async onSuccess(data) {
      const queryKey = ["user", user.id];
      await queryClient.cancelQueries({ queryKey });
      if (typeof data === "string") {
        toast.info(data);
      } else {
        queryClient.setQueryData<UserData>(queryKey, (oldData) => {
          if (!oldData) return;
          return { ...oldData, data };
        });
        toast.success("Hooray", {
          description: "Successfully updated your secondary and primary keys.",
        });
      }
    },
    onError(error, variables, context) {
      console.error("Error updating Primary and secondary key: ", error);
      toast.error(
        "Database error: Failed to create Primary and Secondary keys.",
      );
    },
  });
};

export const useProvideCallbackHostMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCallbackUrl,
    async onSuccess(data) {
      const queryKey: QueryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      if (typeof data === "string") {
        toast.info(data);
      } else {
        queryClient.setQueryData<UserData>(queryKey, (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, momoVariable: data };
        });
        toast.success("Callback URL updated successfully");
      }
    },
    onError(error, variables, context) {
      console.error("Error updating Callback URL: ", error);
      toast.error("Failed to update Callback URL");
    },
  });
};

export const useCreateApiUserMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await fetch("/api/provisioning/create-api-user", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    async onSuccess(response) {
      const queryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      if (response.ok) {
        toast.success("Created Sandbox user");
        queryClient.invalidateQueries({ queryKey });
        return "sss";
      } else {
        toast.error("Failed to create sandBox user", {
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      }
      return { status: response.status, statusText: response.statusText };
    },
    onError(error, variables, context) {
      console.error("Failed to create sandBox user: ", error);
      toast.error("Failed to create sandBox user");
    },
  });
};

export const useGetApiUserMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await fetch("/api/provisioning/get-api-user", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    async onSuccess(response) {
      const queryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      if (response.ok) {
        toast.success("Gotten Sandbox user");
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error("Failed to get sandBox user", {
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      }
      return { status: response.status, statusText: response.statusText };
    },
    onError(error, variables, context) {
      console.error("Failed to create sandBox user: ", error);
      toast.error("Failed to create sandBox user");
    },
  });
};

export const useCreateApiKeyMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await fetch("/api/provisioning/create-api-key", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    async onSuccess(response) {
      const queryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      if (response.ok) {
        toast.success("Created API key");
        queryClient.invalidateQueries({ queryKey });
        return "sss";
      } else {
        toast.error("Failed to create API key", {
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      }
      return { status: response.status, statusText: response.statusText };
    },
    onError(error, variables, context) {
      console.error("Failed to create Api key: ", error);
      toast.error("Failed to create Api key.");
    },
  });
};
