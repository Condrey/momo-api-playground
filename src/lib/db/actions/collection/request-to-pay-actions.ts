import { ServerMessage } from "@/lib/utils";
import {
  RequestToPaySchema,
  requestToPaySchema,
} from "@/lib/validation/request-to-pay-validation";

export async function createRequestToPay(
  formData: RequestToPaySchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = requestToPaySchema.safeParse(formData);
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

  //send  values to the api
  try {
    const response = await fetch("/api/collection/request-to-pay", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data",data)

    if (response.ok) {
      return {
        type: "success",
        title: "Request was a success",
        message: `${data.message}`,
      };
    } else {
      console.log("error: ", response);
      return {
        type: "error",
        title: "Failed request",
        message: `${data.error}`,
      };
    }
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to create callback url.",
    };
  }
}
