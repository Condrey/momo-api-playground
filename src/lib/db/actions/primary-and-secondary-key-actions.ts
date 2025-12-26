"use server";
import { ServerMessage } from "@/lib/utils";
import { verifySession } from "@/lib/verify-session";
import { Session } from "next-auth";
import prisma from "../prisma";

export async function resetUserVariables(): Promise<ServerMessage> {
  const session: Session | null = await verifySession();
  const userId = session?.user.id!;

  //Check if user is permitted to perform this action
  if (!userId) {
    console.error("Not authorized");
    return {
      type: "warning",
      message:
        "You are unauthorized to perform this action. If logged in check your session. ",
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
        callbackUrl: null,
        accessToken: null,
        accessTokenCreatedTime: null,
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
