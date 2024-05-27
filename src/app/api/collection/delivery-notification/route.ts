import prisma from "@/lib/db/prisma";
import { createDeliveryNotificationSchema } from "@/lib/validation/delivery-notification-validation";

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createDeliveryNotificationSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const {
    id,
    notificationMessage,
    authorization,
    primaryKey,
    language,
    targetEnvironment,
    referenceId,
  } = parseResult.data;

  try {
    const subscriptionKey = primaryKey;
    // const referenceId = GenerateReferenceId();
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${referenceId}/deliverynotification`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        notificationMessage: notificationMessage,
        Language: language,
        Authorization: authorization,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({ notificationMessage: notificationMessage }),
    });
    if (response.ok) {
      await prisma.requestToPay.update({
        where: { id: id! },
        data: {
          notificationMessage: notificationMessage!,
        },
      });

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
