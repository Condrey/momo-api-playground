import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import getAuthorization from "@/lib/momo-utils/get-authorization";
import { createSandboxUserProvisioningSchema } from "@/lib/validation/sandbox-user-provisioning-validation";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const parseResult = createSandboxUserProvisioningSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        { error: "Invalid input, check your request body." },
        { status: 400 },
      );
    }

    const { referenceId, primaryKey, secondaryKey } = parseResult.data;
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com//v1_0/apiuser/${referenceId}/apikey`;

    const session = await auth();

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
        data: { apiKey, authorization },
      });
      return Response.json(
        { message: data.apiKey },
        { status: response.status },
      );
    } else {
      return Response.json(
        { message: response.statusText },
        { status: response.status },
      );
    }
  } catch (error) {
    return Response.json({ error: `ServerError: ${error}` }, { status: 500 });
  }
}
