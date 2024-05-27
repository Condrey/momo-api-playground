"use server";
import { ServerMessage } from "@/lib/utils";
import {
  DeletePaymentsSchema,
  deletePaymentSchema,
} from "@/lib/validation/payments-validation";
import prisma from "../../prisma";

export async function deletePayment(
  formData: DeletePaymentsSchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = deletePaymentSchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message:
        "Missing fields. Failed to delete payment, you have missing fields.",
    };
  }

  try {
    const { id } = parseResult.data;
    //  check if the payment exists
    const payment = prisma.payment.findUnique({ where: { id: id! } });
    if (!payment) {
      return {
        type: "error",
        message: "Payment does not exist.",
      };
    } else {
      await prisma.payment.delete({ where: { id: id! } });
      return {
        type: "success",
        message: "Payment deleted.",
      };
    }
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete payment.",
    };
  }
}

export async function deleteAllPayments(
  userId: string,
): Promise<ServerMessage> {
  try {
    await prisma.payment.deleteMany({ where: { userId: userId! } });
    return {
      type: "success",
      message: "All payments deleted.",
    };
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete all payments.",
    };
  }
}
