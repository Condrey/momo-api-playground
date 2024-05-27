import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    authorization: z.string().min(1),
    primaryKey: z.string().min(1),
    targetEnvironment: z.string().min(1),
    id: z.string().min(1),
    referenceId: z.string().min(1),
    callbackUrl: z.string().min(1),
    externalId: z.number().min(1),
  });

  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400, statusText: "Invalid input, check your request body." },
    );
  }

  const {
    authorization,
    primaryKey,
    targetEnvironment,
    id,
    referenceId,
    callbackUrl,
    externalId,
  } = parseResult.data;

  try {
    const referenceId2 = generateReferenceId();
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/invoice/${referenceId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
        "X-Target-Environment": targetEnvironment,
        "X-Reference-Id": referenceId2,
        "X-Callback-Url": callbackUrl,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({
        externalId: `${externalId}`,
      }),
    });
    if (response.ok) {
      await prisma.invoice.update({
        where: { id: id! },
        data: {
          isCancelled: true,
        },
      });

      return Response.json(
        {
          message: response,
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
