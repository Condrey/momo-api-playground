import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { createRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createRequestToPaySchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const {
    accessToken,
    primaryKey,
    callbackUrl,
    targetEnvironment,
    amount,
    currency,
    externalId,
    partyId,
    payerMessage,
    payeeNote,
    // referenceId,
  } = parseResult.data;
  //TODO unused
  //--- callbackUrl,referenceId

  try {
    const subscriptionKey = primaryKey;
    const referenceId = generateReferenceId();
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`;

    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Callback-Url": callbackUrl,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        externalId: `${externalId}`,
        payer: {
          partyIdType: "MSISDN",
          partyId: `${partyId}`,
        },
        payerMessage: payerMessage,
        payeeNote: payeeNote,
      }),
    });
    if (response.ok) {
      if (response.status === 500) {
        return Response.json(
          { message: response.statusText },
          { status: response.status },
        );
      } else {
        await prisma.requestToPay.create({
          data: {
            ...parseResult.data,
            userId: session?.user.id!,
            referenceId: referenceId,
            accessToken: `Bearer ${accessToken}`,
          },
        });

        return Response.json(
          { message: `${response.statusText},${response.status}` },
          { status: response.status },
        );
      }
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
