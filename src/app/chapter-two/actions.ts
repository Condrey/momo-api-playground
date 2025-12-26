
"use server";

import prisma from "@/lib/db/prisma";
import { userDataSelect } from "@/lib/types";
import { verifySession } from "@/lib/verify-session";
import { cache } from "react";

export async function userByIdWithRequestToPay(id?: string) {
  const session = await verifySession();
    const userId = id || session?.user.id;
    return await prisma.user.findUnique({
      where: { id: userId },
      select: userDataSelect,
    });
}
export  const fetchUserByIdWithRequestToPay = cache(userByIdWithRequestToPay)
