import { z } from "zod";

export const createSandboxUserProvisioningSchema = z.object({
  referenceId: z.string(),
  primaryKey: z.string(),
  secondaryKey: z.string(),
});

export type CreateSandboxUserProvisioningSchema = z.infer<
  typeof createSandboxUserProvisioningSchema
>;
