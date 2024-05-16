import { z } from "zod";

export const createPrimaryAndSecondaryKeySchema = z.object({
  primaryKey: z.string().min(1, { message: "This field should not be empty." }),
  secondaryKey: z.string().min(1, { message: "Secondary key is a must." }),
});

export type CreatePrimaryAndSecondaryKeySchema = z.infer<
  typeof createPrimaryAndSecondaryKeySchema
>;
