import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ServerMessage = {
  type: "error" | "success" | "warning";
  message: string;
  title?: string | undefined;
  errors?: string | undefined;
};
