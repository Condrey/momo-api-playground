import { z } from "zod";

export const requestToPaySchema = z.object({
  accessToken: z.string().min(1),
  callbackUrl: z.string().min(1),
  referenceId: z.string().min(1),
  targetEnvironment: z.string().min(1),
  primaryKey: z.string().min(1),
  amount: z.string().min(1, { message: "Please make sure amount is entered" }),
  currency: z
    .string()
    .min(1, "Of course this field must contain a currency")
    .default("EUR"),
  externalId: z.number().min(10, "This is needed to"),
  partyId: z.number().min(10, "Provide partyId too"),
  payerMessage: z
    .string()
    .min(10, { message: "Make the message >10 characters at least." }),
  payeeNote: z.string().min(10, { message: "Type more ..." }),
});

export type RequestToPaySchema = z.infer<typeof requestToPaySchema>;
