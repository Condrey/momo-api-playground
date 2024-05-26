import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import { updateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    id: z.string(),
    authorization: z.string(),
    referenceId: z.string(),
    targetEnvironment: z.string(),
    primaryKey: z.string(),
  });

  const parseResult = schema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const { id, authorization, primaryKey, targetEnvironment, referenceId } =
    parseResult.data;
  //TODO unused
  //--- callbackUrl,referenceId

  try {
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttowithdraw/${referenceId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
        "X-Target-Environment": targetEnvironment,
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    if (response.ok) {
      const data = await response.json();

      await prisma.requestToWithdraw.update({
        where: { id: id! },
        data: {
          isChecked: true,
        },
      });

      return Response.json(
        {
          message: data,
        },
        { status: response.status },
      );
    } else {
      return Response.json(
        { error: response.statusText },
        { status: response.status },
      );
    }
  } catch (e) {
    console.error("ServerError: ", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
