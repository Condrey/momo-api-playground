import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import { userDataSelect } from "@/lib/types";
import { verifySession } from "@/lib/verify-session";

export async function POST(req: Request) {
  const body = await req.json();
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

    const referenceId = user.momoVariable?.referenceId ?? generateReferenceId();
    const providerCallbackHost = user.momoVariable?.callbackHost;
    const subscriptionKey = user.momoVariable?.primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`;

    if (!providerCallbackHost) {
      console.error("Please provide a callbackHost");
      return Response.json(
        {
          error: "Missing callbackHost ",
        },
        { status: 401, statusText: "Missing callbackHost ." },
      );
    }
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Reference-Id": referenceId,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({ providerCallbackHost }),
    });
    if (response.ok) {
      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { momoVariable: { update: { referenceId } } },
      });
    }
    return Response.json({
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error("Server error: ", `${error}`);
    return Response.json(
      { message: `ServerError: ${error}` },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
