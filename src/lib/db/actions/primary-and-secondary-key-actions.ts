"use server";
import { auth } from "@/app/auth";
import {
  CreatePrimaryAndSecondaryKeySchema,
  createPrimaryAndSecondaryKeySchema,
} from "@/lib/validation/primary-and-secondary-key-validation";
import { Session } from "next-auth";
import prisma from "../prisma";
import { ServerMessage } from "@/lib/utils";

export async function createPrimaryAndSecondaryKey(
  formData: CreatePrimaryAndSecondaryKeySchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = createPrimaryAndSecondaryKeySchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message:
        "Missing fields. Failed to create Primary and secondary keys, you have missing fields.",
    };
  }
  //Prepare data for insertion into the database
  const { primaryKey, secondaryKey } = parseResult.data;

  const session: Session | null = await auth();
  const userId = session?.user.id!;

  //Check if user is permitted to perform this action
  if (!session?.user.id) {
    console.error("Not authorized");
    return {
      type: "warning",
      message: "You are unauthorized to perform this action.",
    };
  }

  // Insert data into the database
  try {
    await prisma.user.update({
      where: { id: userId! },
      data: {
        primaryKey,
        secondaryKey,
      },
    });
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to create Primary and Secondary keys.",
    };
  }

  return {
    type: "success",
    title: "Hooray.!",
    message: "Successfully updated your secondary and primary keys.",
  };
}

export async function resetUserVariables(): Promise<ServerMessage> {
  const session: Session | null = await auth();
  const userId = session?.user.id!;

  //Check if user is permitted to perform this action
  if (!session?.user.id) {
    console.error("Not authorized");
    return {
      type: "warning",
      message: "You are unauthorized to perform this action.",
    };
  }

  // Insert data into the database
  try {
    await prisma.user.update({
      where: { id: userId! },
      data: {
        apiKey: null,
        referenceId: null,
        authorization: null,
        isUserPresent: false,
      },
    });
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to create Primary and Secondary keys.",
    };
  }

  return {
    type: "success",
    title: "Boo-yah.!",
    message: "Your variables were reset.",
  };
}
