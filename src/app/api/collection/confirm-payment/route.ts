import prisma from "@/lib/db/prisma";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    authorization: z.string().min(1),
    primaryKey: z.string().min(1),
    targetEnvironment: z.string().min(1),
    id: z.string().min(1),
    referenceId: z.string().min(1),
  });

  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400, statusText: "Invalid input, check your request body." },
    );
  }

  const { authorization, primaryKey, targetEnvironment, id, referenceId } =
    parseResult.data;
  //TODO unused
  //--- callbackUrl,referenceId

  try {
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/payment/${referenceId}`;

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

      await prisma.payment.update({
        where: { id: id! },
        data: {
          isChecked: true,
        },
      });

      return Response.json(
        {
          message: data,
        },
        { status: response.status, statusText: response.statusText },
      );
    } else {
      return Response.json(
        { error: response.statusText },
        { status: response.status, statusText: response.statusText },
      );
    }
  } catch (e) {
    console.error("ServerError: ", e);
    return Response.json(
      { error: "Server error" },
      { status: 500, statusText: "Server error" },
    );
  }
}
