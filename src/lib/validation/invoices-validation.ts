import { z } from "zod";

export const createInvoicesSchema = z.object({
  authorization: z.string().min(1),
  primaryKey: z.string().min(1),
  callbackUrl: z.string().min(1),
  referenceId: z.string().min(1),
  targetEnvironment: z.string().min(1),
  externalId: z
    .number()
    .min(
      1,
      "The external id will be included in transaction history report, needed ",
    ),
  amount: z.string().min(1, "Provide an amount."),
  currency: z.string().min(1, "Currency is a must"),
  validityDuration: z
    .number()
    .min(1, `The duration that the invoice is valid in seconds is required.`),
  intendedPayerPartyId: z.string().min(1, "This party Id is a must"),
  payeePartyId: z.string().min(1, "This party Id is also a must"),
  description: z.string().min(1),
});
export const updateInvoiceSchema = createInvoicesSchema.extend({
  id: z.string().min(5),
});
export const deleteInvoiceSchema = z.object({ id: z.string().min(5) });
export type CreateInvoicesSchema = z.infer<typeof createInvoicesSchema>;
export type UpdateInvoicesSchema = z.infer<typeof updateInvoiceSchema>;
export type DeleteInvoicesSchema = z.infer<typeof deleteInvoiceSchema>;
