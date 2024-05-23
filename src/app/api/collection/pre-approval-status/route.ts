import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    referenceId: z.string(),
    primaryKey: z.string(),
    authorization: z.string(),
    targetEnvironment: z.string(),
  });

  const parseResult = schema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      { error: "Invalid input, check your request body." },
      { status: 400 },
    );
  }

  const { authorization, primaryKey, targetEnvironment, referenceId } =
    parseResult.data;
  //TODO unused
  //--- referenceId

  try {
    const subscriptionKey = primaryKey;
    const url = `https://sandbox.momodeveloper.mtn.com/collection/v2_0/preapproval/${referenceId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
        "X-Target-Environment": targetEnvironment,
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return Response.json(
        {
          message: data,
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
