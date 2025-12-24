import prisma from "@/lib/db/prisma";
import { userDataSelect } from "@/lib/types";
import { verifySession } from "@/lib/verify-session";
import { cache } from "react";

export async function userById(id?: string) {
  const session = await verifySession();
  if (!session) {
    return null;
  }
  const userId = id || session.user.id;
  return await prisma.user.findUnique({
    where: { id: userId },
    select: userDataSelect,
  });
}
export const fetchUserById = cache(userById);
export async function fetchUserByIdWithRequestToPay(id?: string) {
  try {
    const session = await verifySession();
    const userId = id || session?.user.id;
    return await prisma.user.findUnique({
      where: { id: userId },
      select: userDataSelect,
    });
  } catch (e) {
    console.error("Error fetching user :", e);
    throw new Error("Failed to fetch user.");
  }
}
