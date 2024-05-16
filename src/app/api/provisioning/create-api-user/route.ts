import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import generateUUID from "@/lib/momo-utils/generate-uuid";
import getAuthorization from "@/lib/momo-utils/get-authorization";
import { createSandboxUserProvisioningSchema } from "@/lib/validation/sandbox-user-provisioning-validation";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const parseResult = createSandboxUserProvisioningSchema.safeParse(body);
    if (!parseResult.success) {
      console.error("err invINput:", body);

      return Response.json(
        { error: "Invalid input, check your request body." },
        { status: 400 },
      );
    }
    const { primaryKey, secondaryKey } = parseResult.data;

    const callbackUrl = "https://momo-api.vercel.app";
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`;

    const authorization = getAuthorization(primaryKey, secondaryKey);
    const referenceId = generateUUID();
    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Reference-Id": referenceId,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({ providerCallbackHost: callbackUrl }),
    });
    if (response.ok) {
      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { authorization, referenceId },
      });
      return Response.json({ message: response }, { status: 200 });
    } else {
      return Response.json({ message: response.statusText }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ message: `ServerError: ${error}` }, { status: 500 });
  }
}
