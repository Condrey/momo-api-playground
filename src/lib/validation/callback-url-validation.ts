import { z } from "zod";

export const callBackUrlSchema = z.object({
  callbackUrl: z.string(),
  callbackHost:z.string()
});
export type CallBackUrlSchema = z.infer<typeof callBackUrlSchema>;
