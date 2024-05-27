import prisma from "@/lib/db/prisma";
import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    return await prisma.invoice.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Error fetching invoice: ", e);
    throw new Error("Failed to fetch invoice.");
  }
}
