import { z } from "zod";

const requiredString = z.string().min(1, "This field is required").trim();

export const callBackUrlSchema = z.object({
  momoVariableId: z.string().optional(),
  callbackUrl: z.url().min(1, "Please provide a valid url").trim(),
  callbackHost: requiredString,
});
export type CallBackUrlSchema = z.infer<typeof callBackUrlSchema>;

export const createPrimaryAndSecondaryKeySchema = z.object({
  momoVariableId: z.string().optional(),
  primaryKey: z.string().min(1, { message: "This field should not be empty." }),
  secondaryKey: z.string().min(1, { message: "Secondary key is a must." }),
});

export type CreatePrimaryAndSecondaryKeySchema = z.infer<
  typeof createPrimaryAndSecondaryKeySchema
>;
