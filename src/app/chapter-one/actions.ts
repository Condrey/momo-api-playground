"use server";

import prisma from "@/lib/db/prisma";
import { userDataSelect } from "@/lib/types";
import {
  callBackUrlSchema,
  CallBackUrlSchema,
  createPrimaryAndSecondaryKeySchema,
  CreatePrimaryAndSecondaryKeySchema,
} from "@/lib/validation";
import { verifySession } from "@/lib/verify-session";
import { MomoVariable } from "@prisma/client";
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

export async function createCallbackUrl(
  formData: CallBackUrlSchema,
): Promise<string | MomoVariable> {
  const { callbackUrl, callbackHost, momoVariableId } =
    callBackUrlSchema.parse(formData);
  const session = await verifySession();
  if (!session) {
    console.error("Not authorized");
    return "You are unauthorized to perform this action.  If logged in check your session. ";
  }

  return await prisma.momoVariable.upsert({
    where: { id: momoVariableId },
    update: { callbackUrl, callbackHost },
    create: {
      callbackUrl,
      callbackHost,
      users: { connect: { id: session.user.id } },
    },
  });
}

export async function createPrimaryAndSecondaryKey(
  formData: CreatePrimaryAndSecondaryKeySchema,
): Promise<string | MomoVariable> {
  const { primaryKey, secondaryKey, momoVariableId } =
    createPrimaryAndSecondaryKeySchema.parse(formData);
  const session = await verifySession();
  if (!session) {
    console.error("Not authorized");
    return "You are unauthorized to perform this action.  If logged in check your session.";
  }
  return await prisma.momoVariable.upsert({
    where: { id: momoVariableId },
    update: { primaryKey, secondaryKey },
    create: {
      primaryKey,
      secondaryKey,
      users: { connect: { id: session.user.id } },
    },
  });
}

export async function resetUserVariables(
  momoVariableId: string,
): Promise<string | void> {
  const session = await verifySession();
  if (!session) {
    console.error("Not authorized");
    return "You are unauthorized to perform this action.  If logged in check your session. ";
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      momoVariable: { delete: {} },
      isUserPresent: false,
    },
  });

  // await prisma.momoVariable.delete({
  //   where: { id: momoVariableId },

  // });
}
