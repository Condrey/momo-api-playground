import prisma from "@/lib/db/prisma";
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

    const referenceId = user.momoVariable?.referenceId;
    if (!referenceId) {
      const msg = "Your reference id is missing, please add";
      console.error(msg);
      return Response.json(
        {
          error: msg,
        },
        { status: 401, statusText: msg },
      );
    }
    const subscriptionKey = user.momoVariable?.secondaryKey!;
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${referenceId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });

    if (response.ok) {
      const data = await response.json();
      await prisma.user.update({
        where: { id: session?.user.id! },
        data: { isUserPresent: true },
      });
      return Response.json(
        { message: data },
        { statusText: data, status: response.status },
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
