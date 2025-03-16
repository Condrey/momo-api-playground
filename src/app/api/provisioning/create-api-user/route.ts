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
    const referenceId = generateReferenceId();
    const session = await auth();

    const { primaryKey, secondaryKey } = parseResult.data;
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id! },
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

    const callbackHost = user.callbackHost;
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Reference-Id": referenceId,
        "Ocp-Apim-Subscription-Key": '464a62ef20e445c2814f62ae56f96353',
      },
      body: JSON.stringify({ providerCallbackHost: callbackHost }),
    });
    if (response.ok) {
      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { referenceId: referenceId },
      });
      return Response.json({ message: response }, { status: response.status ,statusText:response.statusText});
    } else {
      return Response.json(
        { message: response.statusText },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Server error: ", `${error}`)
    return Response.json({ message: `ServerError: ${error}` }, { status: 500 });
  }
}
