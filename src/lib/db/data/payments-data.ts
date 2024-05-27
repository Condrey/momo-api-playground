import prisma from "@/lib/db/prisma";
import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
export async function fetchPaymentById(id: string) {
  noStore();
  try {
    return await prisma.payment.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Error fetching payment: ", e);
    throw new Error("Failed to fetch payment.");
  }
}
