import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import GenerateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { createPreApprovalSchema } from "@/lib/validation/pre-approval-validation";
import { updateRequestToPaySchema } from "@/lib/validation/request-to-pay-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createPreApprovalSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const {
    authorization,
    primaryKey,
    callbackUrl,
    targetEnvironment,
   payerCurrency,
    partyId,validityTime,
    payerMessage,
    referenceId,
  } = parseResult.data;
  //TODO unused
  //--- referenceId

  try {
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/preapproval`;

    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "X-Callback-Url":callbackUrl,
        "X-Reference-Id":GenerateReferenceId(),
        "X-Target-Environment": targetEnvironment,
        "Content-Type":"application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body:JSON.stringify({
        payer: {
            partyIdType: "MSISDN",
            partyId: partyId,
        },
        payerCurrency: payerCurrency,
        payerMessage: payerMessage,
        validityTime: validityTime
    })
    });
    if (response.ok) {
        console.log('OkResponse: ',response);        
          return Response.json(
        {
          message: `${response.statusText},${response.status}`,
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
