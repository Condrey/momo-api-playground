import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import generateReferenceId from "@/lib/momo-utils/generate-reference-id";
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
    const generatedReferenceId = generateReferenceId();
    const session = await auth();

    const { primaryKey, secondaryKey, referenceId } = parseResult.data;
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id! },
    });

    const callbackHost = user?.callbackHost;
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Reference-Id": generatedReferenceId,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: JSON.stringify({ providerCallbackHost: callbackHost }),
    });
    if (response.ok) {
      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { referenceId: generatedReferenceId },
      });
      return Response.json({ message: response }, { status: response.status });
    } else {
      return Response.json(
        { message: response.statusText },
        { status: response.status },
      );
    }
  } catch (error) {
    return Response.json({ message: `ServerError: ${error}` }, { status: 500 });
  }
}
