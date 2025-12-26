import { PartyIdType } from "@prisma/client";
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

// Request to pay
export const createRequestToPaySchema = z.object({
  amount: z.string().min(1, { message: "Please make sure amount is entered" }),
  currency: z.string().min(1, "Of course this field must contain a currency"),
  externalId: z.number().min(10, "This is needed top"),
  partyId: z.number().min(10, "Provide partyId too"),
  payerMessage: z
    .string()
    .min(10, { message: "Make the message >10 characters at least." }),
  payeeNote: z.string().min(10, {
    message:
      "Message that will be written in the payee transaction history note field.",
  }),
});

export const updateRequestToPaySchema = createRequestToPaySchema.extend({
  id: z.string().min(5),
});
export const deleteRequestToPaySchema = createRequestToPaySchema.extend({
  id: z.string().min(5),
});

export type CreateRequestToPaySchema = z.infer<typeof createRequestToPaySchema>;
export type UpdateRequestToPaySchema = z.infer<typeof updateRequestToPaySchema>;
export type DeleteRequestToPaySchema = z.infer<typeof deleteRequestToPaySchema>;

// Party
export const payerSchema = z.object({
  id: z.string().optional(),
  partyIdType: z.enum(PartyIdType),
  partyId: requiredString,
  response: requiredString,
});

export type PayerSchema = z.infer<typeof payerSchema>;
