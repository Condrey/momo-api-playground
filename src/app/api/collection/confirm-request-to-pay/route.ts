import prisma from "@/lib/db/prisma";
import { updateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = updateRequestToPaySchema.safeParse(body);
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
    id,
    referenceId,
  } = parseResult.data;
  //TODO unused
  //--- callbackUrl,referenceId

  try {
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${referenceId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "X-Target-Environment": targetEnvironment,
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    if (response.ok) {
      const data = await response.json();

      await prisma.requestToPay.update({
        where: { id: id! },
        data: {
          isChecked: true,
          financialTransactionId: Number(data.financialTransactionId),
        },
      });

      return Response.json(
        {
          message: `${response.statusText},${response.status}`,
          message2: data,
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
