"use server";
import { ServerMessage } from "@/lib/utils";
import {
  UpdateRequestToPaySchema,
  updateRequestToPaySchema,
} from "@/lib/validation/request-to-pay-validation";
import prisma from "../../prisma";

export async function deleteRequestToPay(
  formData: UpdateRequestToPaySchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = updateRequestToPaySchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message:
        "Missing fields. Failed to create request to pay, you have missing fields.",
    };
  }

  try {
    const { id } = parseResult.data;
    //  check if the request exists
    const request = prisma.requestToPay.findUnique({ where: { id: id! } });
    if (!request) {
      return {
        type: "error",
        message: "Transaction does not exist.",
      };
    } else {
      await prisma.requestToPay.delete({ where: { id: id! } });
      return {
        type: "success",
        message: "Transaction deleted.",
      };
    }
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete transaction.",
    };
  }
}

export async function deleteAllRequestsToPay(
  userId: string,
): Promise<ServerMessage> {
  try {
    await prisma.requestToPay.deleteMany({ where: { userId: userId! } });
    return {
      type: "success",
      message: "All transactions deleted.",
    };
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete all transactions.",
    };
  }
}
