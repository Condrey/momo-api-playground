import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
import getAuthorization from "@/lib/momo-utils/get-authorization";
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
    const subscriptionKey = user.momoVariable?.primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${referenceId}/apikey`;

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
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    const data = await response.json();
    if (response.ok) {
      const apiKey = data.apiKey;
      const authorization = getAuthorization(referenceId, apiKey);

      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { momoVariable: { update: { apiKey, authorization } } },
      });
      return Response.json(
        { message: data },
        { status: response.status, statusText: response.statusText },
      );
    } else {
      return Response.json(
        { message: response.statusText },
        { status: response.status, statusText: response.statusText },
      );
    }
  } catch (error) {
    return Response.json(
      { error: `ServerError: ${error}` },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
