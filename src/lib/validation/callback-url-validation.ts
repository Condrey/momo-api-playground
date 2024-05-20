import { z } from "zod";

export const callBackUrlSchema = z.object({
    callbackUrl: z.string().url(),
  });
  export type CallBackUrlSchema = z.infer<typeof callBackUrlSchema>;
