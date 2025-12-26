"use client";

import { CreateRequestToPaySchema } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateAccessTokenMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await fetch("/api/provisioning/create-access-token", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    async onSuccess(response) {
      const queryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      if (response.ok) {
        toast.success("Created Access Token");
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error("Failed to create Access Token", {
          description: JSON.stringify(
            `Status: ${response.status},StatusText: ${response.statusText}`,
          ),
        });
      }
      return { status: response.status, statusText: response.statusText };
    },
    onError(error, variables, context) {
      console.error("Failed to create Access Token: ", error);
      toast.error("Failed to create Access Token.");
    },
  });
};

export const useRequestToPayMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateRequestToPaySchema) =>
      await fetch("/api/collection/request-to-pay", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    async onSuccess(response) {
      const queryKey = ["user", userId];
      await queryClient.cancelQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey });
    },
    onError(error, variables, context) {
      console.error("Failed to make request to pay: ", error);
      toast.error("Failed to make request to pay.");
    },
  });
};
