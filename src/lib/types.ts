import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  email: true,
  image: true,
  name: true,
  momoVariable: true,
  isUserPresent: true,
  role: true,
  RequestToPay: { orderBy: { createdAt: "desc" } },
  payments: { orderBy: { createdAt: "desc" } },
  invoices: { orderBy: { createdAt: "desc" } },
} satisfies Prisma.UserSelect;
export type UserData = Prisma.UserGetPayload<{ select: typeof userDataSelect }>;
