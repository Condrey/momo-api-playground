import { auth } from "@/app/auth";
import prisma from "@/lib/db/prisma";
import getAuthorization from "@/lib/momo-utils/get-authorization";
import { createSandboxUserProvisioningSchema } from "@/lib/validation/sandbox-user-provisioning-validation";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    primaryKey: z.string().min(1),
    authorization: z.string().min(1),
  });

  try {
    const parseResult = schema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        { error: "Invalid input, check your request body." },
        { status: 400 },
      );
    }

    const { authorization, primaryKey } = parseResult.data;
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/token/`;

    const session = await auth();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    const data = await response.json();
    if (response.ok) {
      const accessToken = data.access_token;
      const currentTime = Date.now();

      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { accessToken, accessTokenCreatedTime: `${currentTime}` },
      });
      return Response.json({ message: data }, { status: 200 });
    } else {
      return Response.json({ message: response.statusText }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: `ServerError: ${error}` }, { status: 500 });
  }
}
