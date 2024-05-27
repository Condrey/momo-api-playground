import { z } from "zod";

export const createPaymentsSchema = z.object({
  authorization: z.string().min(1),
  primaryKey: z.string().min(1),
  callbackUrl: z.string().min(1),
  referenceId: z.string().min(1),
  targetEnvironment: z.string().min(1),
  externalTransactionId: z
    .number()
    .min(1, "An external transaction id to tie to the payment"),
  amount: z.string().min(1, "Provide an amount."),
  currency: z.string().min(1, "Currency is a must"),
  customerReference: z
    .string()
    .min(1, `Provider's customer reference is required.`),
  serviceProviderUserName: z.string().min(1, `Provider's userName is needed.`),
  couponId: z.string().min(1).optional(),
  productId: z.string().min(1).optional(),
  productOfferingId: z.string().min(1).optional(),
  receiverMessage: z.string().min(1).optional(),
  senderNote: z.string().min(1).optional(),
  maxNumberOfRetries: z.number().min(1).optional(),
  includeSenderCharges: z.boolean().default(false),
});
export const updatePaymentSchema = createPaymentsSchema.extend({
  id: z.string().min(5),
});
export const deletePaymentSchema = z.object({ id: z.string().min(5) });
export type CreatePaymentsSchema = z.infer<typeof createPaymentsSchema>;
export type UpdatePaymentsSchema = z.infer<typeof updatePaymentSchema>;
export type DeletePaymentsSchema = z.infer<typeof deletePaymentSchema>;
