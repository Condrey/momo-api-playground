import prisma from "@/lib/db/prisma";
import GenerateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { createPaymentsSchema } from "@/lib/validation/payments-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createPaymentsSchema.safeParse(body);
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
    externalTransactionId,
    customerReference,
    serviceProviderUserName,
    amount,
    couponId,
    productId,
    productOfferingId,
    receiverMessage,
    senderNote,
    maxNumberOfRetries,
    includeSenderCharges,
    // referenceId,
  } = parseResult.data;
  //TODO unused
  //--- referenceId

  console.log("Body: ", parseResult.data);

  try {
    const subscriptionKey = primaryKey;
    const referenceId = GenerateReferenceId();
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/payment`;

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
        externalTransactionId: `${externalTransactionId}`,
        money: {
          amount: amount,
          currency: currency,
        },
        customerReference: customerReference,
        serviceProviderUserName: serviceProviderUserName,
        couponId: couponId,
        productId: productId,
        productOfferingId: productOfferingId,
        receiverMessage: receiverMessage,
        senderNote: senderNote,
        maxNumberOfRetries: maxNumberOfRetries,
        includeSenderCharges: includeSenderCharges,
      }),
    });
    if (response.ok) {
      await prisma.payments.create({
        data: {
          authorization,
          primaryKey,
          callbackUrl,
          targetEnvironment,
          currency,
          externalTransactionId,
          customerReference,
          serviceProviderUserName,
          amount,
          couponId,
          productId,
          productOfferingId,
          receiverMessage,
          senderNote,
          maxNumberOfRetries,
          includeSenderCharges,
          referenceId,
        },
      });
      console.log("msg: ", response);

      return Response.json(
        {
          message: response,
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
