import { z } from "zod";

export const callBackUrlSchema = z.object({
  callbackUrl: z.string(),
});
export type CallBackUrlSchema = z.infer<typeof callBackUrlSchema>;
