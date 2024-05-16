import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import prisma from "@/lib/db/prisma";
import { auth } from "@/app/auth";
export async function fetchUserById(id?: string) {
  noStore();
  try {
    const session = await auth();
    const userId = id || session?.user.id;
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (e) {
    console.error("Error fetching user :", e);
    throw new Error("Failed to fetch user.");
  }
}
