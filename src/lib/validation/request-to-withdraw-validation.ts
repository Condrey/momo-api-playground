import { z } from "zod";

export const createRequestToWithdrawSchema = z.object({
  authorization: z.string().min(1),
  callbackUrl: z.string().min(1),
  referenceId: z.string().min(1),
  targetEnvironment: z.string().min(1),
  primaryKey: z.string().min(1),

  payeeNote: z.string().min(10, "Please enter payee note"),
  externalId: z.number().min(10, "External Id is required"),
  partyId: z.number().min(10, "Provide partyId too"),
  amount: z.string().min(1, "Please enter withdraw amount."),
  currency: z
    .string()
    .min(1, "Of course this field must contain a currency")
    .default("EUR"),
  payerMessage: z
    .string()
    .min(10, { message: "Make the message >10 characters at least." }),
});

export const updateRequestToWithdrawSchema =
  createRequestToWithdrawSchema.extend({
    id: z.string(),
  });

export type CreateRequestToWithdrawSchema = z.infer<
  typeof createRequestToWithdrawSchema
>;
export type UpdateRequestToWithdrawSchema = z.infer<
  typeof updateRequestToWithdrawSchema
>;
