import { z } from "zod";

export const createDeliveryNotificationSchema = z.object({
  id: z.string().min(1),
  notificationMessage: z
    .string()
    .min(1, "Please enter the notification message.")
    .max(160, "The maximum length required has been reached"),
  referenceId: z.string().min(1),
  language: z.string().min(2).default("en"),
  authorization: z.string().min(1),
  targetEnvironment: z.string().min(1),
  primaryKey: z.string().min(1),
});
export type CreateDeliveryNotificationSchema = z.infer<
  typeof createDeliveryNotificationSchema
>;
