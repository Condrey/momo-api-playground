import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import getAuthorization from "@/lib/momo-utils/get-authorization";
import { userDataSelect } from "@/lib/types";
import { createRequestToPaySchema } from "@/lib/validation";
import { verifySession } from "@/lib/verify-session";

// What you need are
// 1. new apiKey with user provisioning reference key i.e create a user provisioning first
// 2. access token expires in 1 hr: you may need to create 1 each time, it works for more than 1 use cases.
export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = createRequestToPaySchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const { amount, currency, externalId, partyId, payerMessage, payeeNote } =
    parseResult.data;

  try {
    const session = await verifySession();
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id! },
      select: userDataSelect,
    });
    if (!user) {
      console.error("User not found in the database");
      return Response.json(
        {
          error: "User not found in the database",
        },
        { status: 401, statusText: "User not found in the database." },
      );
    }
    const currentTime = new Date();
    const TOKEN_TTL = 3600;
    const referenceId = user.momoVariable?.referenceId ?? generateReferenceId();
    let apiKey;
    let accessToken = user.momoVariable?.accessToken;
    const subscriptionKey = user.momoVariable?.primaryKey;
    const callbackUrl = user.momoVariable?.callbackUrl;
    const targetEnvironment = "sandbox";
    const url =
      "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay";

    if (!subscriptionKey) {
      console.error("Please provide a subscription key as it is missing");
      return Response.json(
        {
          message:
            "Missing subscription key (Please register your primary and secondary keys in our database to proceed) ",
        },
        {
          status: 401,
          statusText: "Missing subscription key .",
        },
      );
    }
    // Getting a new api key from a new referenceId
    const apiKeyUrl = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${referenceId}/apikey`;
    const apiKeyResponse = await fetch(apiKeyUrl, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    const apiKeyData = await apiKeyResponse.json();
    if (apiKeyResponse.ok) {
      apiKey = apiKeyData.apiKey;
    } else {
      return Response.json(
        { message: apiKeyData },
        {
          status: apiKeyResponse.status,
          statusText: apiKeyResponse.statusText,
        },
      );
    }
    // console.log({ apiKey });
    const authorization = getAuthorization(referenceId, apiKey);

    // Getting a new accessToken
    const tokenUrl = `https://sandbox.momodeveloper.mtn.com/collection/token/`;
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    const tokenData = await tokenResponse.json();
    if (tokenResponse.ok) {
      accessToken = tokenData.access_token;
    } else {
      return Response.json(
        { message: tokenData },
        { status: tokenResponse.status, statusText: tokenResponse.statusText },
      );
    }

    console.log({ accessToken });

    const newReferenceId = generateReferenceId();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Callback-Url": callbackUrl!,
        "X-Reference-Id": newReferenceId,
        "X-Target-Environment": targetEnvironment,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({
        amount,
        currency,
        externalId: `${externalId}`,
        payer: {
          partyIdType: "MSISDN",
          partyId: `${partyId}`,
        },
        payerMessage,
        payeeNote,
      }),
    });

    if (response.ok) {
      console.log(parseResult.data);
      await prisma.requestToPay.create({
        data: {
          ...parseResult.data,
          userId: session?.user.id!,
          referenceId: newReferenceId,
          accessToken: `Bearer ${accessToken}`,
        },
      });

      return Response.json(
        // { message: data },
        { status: response.status, statusText: response.statusText },
      );
    } else {
      return Response.json(
        // { error: data },
        { status: response.status, statusText: response.statusText },
      );
    }
  } catch (e) {
    console.error("ServerError: ", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
