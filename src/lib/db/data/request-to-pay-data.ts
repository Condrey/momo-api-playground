import prisma from "@/lib/db/prisma";
import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
export async function fetchRequestToPayById(id: string) {
  noStore();
  try {
    return await prisma.requestToPay.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Error fetching request to pay :", e);
    throw new Error("Failed to fetch request to pay.");
  }
}
