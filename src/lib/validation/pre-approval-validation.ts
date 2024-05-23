import { z } from "zod";

export const createPreApprovalSchema = z.object({
  authorization: z.string().min(1),
  callbackUrl: z.string().min(1),
  referenceId: z.string().min(1),
  targetEnvironment: z.string().min(1),
  primaryKey: z.string().min(1),
  partyId: z.number().min(10, "Provide partyId too"),
  payerCurrency: z
    .string()
    .min(1, "Of course this field must contain a currency")
    .default("EUR"),
  payerMessage: z
    .string()
    .min(10, { message: "Make the message >10 characters at least." }),

  validityTime: z.number().min(120, "This is needed too, must be >= 120"),
});

export const updatePreApprovalSchema = createPreApprovalSchema.extend({
  id: z.string(),
});

export type CreatePreApprovalSchema = z.infer<typeof createPreApprovalSchema>;
export type UpdatePreApprovalSchema = z.infer<typeof updatePreApprovalSchema>;
