import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { createInvoicesSchema } from "@/lib/validation/invoices-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createInvoicesSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400, statusText: "Invalid input, check your request body." },
    );
  }

  const {
    authorization,
    primaryKey,
    callbackUrl,
    targetEnvironment,
    currency,
    externalId,
    amount,
    description,
    payeePartyId,
    intendedPayerPartyId,
    validityDuration,
    // referenceId,
  } = parseResult.data;
  //TODO unused
  //--- referenceId

  try {
    const subscriptionKey = primaryKey;
    const referenceId = generateReferenceId();
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/invoice`;
    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authorization}`,
        "X-Callback-Url": callbackUrl,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({
        externalId: externalId,
        amount: amount,
        currency: currency,
        validityDuration: validityDuration,
        intendedPayer: {
          partyIdType: "MSISDN",
          partyId: intendedPayerPartyId,
        },
        payee: {
          partyIdType: "MSISDN",
          partyId: payeePartyId,
        },
        description: description,
      }),
    });
    if (response.ok) {
      await prisma.invoice.create({
        data: {
          authorization: `Bearer ${authorization}`,
          userId: session?.user.id,
          primaryKey,
          callbackUrl,
          targetEnvironment,
          currency,
          externalId,
          amount,
          description,
          payeePartyId,
          intendedPayerPartyId,
          validityDuration,
          referenceId,
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
