"use client";

import { UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "./actions";

export const useUserQuery = (initialData: UserData) =>
  useQuery({
    queryKey: ["user", initialData.id],
    queryFn: async () => fetchUserById(initialData.id),
    initialData,
  });
