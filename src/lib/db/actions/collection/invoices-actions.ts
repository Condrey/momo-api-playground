"use server";
import { ServerMessage } from "@/lib/utils";
import {
  DeleteInvoicesSchema,
  deleteInvoiceSchema,
} from "@/lib/validation/invoices-validation";
import prisma from "../../prisma";

export async function deleteInvoice(
  formData: DeleteInvoicesSchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = deleteInvoiceSchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message:
        "Missing fields. Failed to delete invoice, you have missing fields.",
    };
  }

  try {
    const { id } = parseResult.data;
    //  check if the invoice exists
    const invoice = prisma.invoice.findUnique({ where: { id: id! } });
    if (!invoice) {
      return {
        type: "error",
        message: "Invoice does not exist.",
      };
    } else {
      await prisma.invoice.delete({ where: { id: id! } });
      return {
        type: "success",
        message: "Invoice deleted.",
      };
    }
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete invoice.",
    };
  }
}

export async function deleteAllInvoices(
  userId: string,
): Promise<ServerMessage> {
  try {
    await prisma.invoice.deleteMany({ where: { userId: userId! } });
    return {
      type: "success",
      message: "All invoices deleted.",
    };
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to delete all invoices.",
    };
  }
}
