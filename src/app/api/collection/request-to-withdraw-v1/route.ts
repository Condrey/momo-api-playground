import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { updateRequestToWithdrawSchema } from "@/lib/validation/request-to-withdraw-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = updateRequestToWithdrawSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400, statusText: "Invalid input, check your request body." },
    );
  }

  const {
    id,
    authorization,
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
  //--- referenceId

  try {
    const subscriptionKey = primaryKey;
    const referenceId = generateReferenceId();
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttowithdraw`;

    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "X-Callback-Url": callbackUrl,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({
        payeeNote: payeeNote,
        externalId: `${externalId}`,
        amount: amount,
        currency: currency,
        payer: {
          partyIdType: "MSISDN",
          partyId: `${partyId}`,
        },
        payerMessage: payerMessage,
      }),
    });
    if (response.ok) {
      await prisma.requestToWithdraw.create({
        data: {
          authorization,
          primaryKey,
          callbackUrl,
          targetEnvironment,
          amount,
          currency,
          externalId,
          partyId,
          payerMessage,
          payeeNote,
          referenceId,
          version: `V1`,
          userId: session?.user.id!,
          requestToPayId: id!,
        },
      });

      // const data = await response.json();
      console.log(response);

      return Response.json({ message: response }, { status: response.status });
      // return Response.json({ message: data }, { status: response.status });
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
