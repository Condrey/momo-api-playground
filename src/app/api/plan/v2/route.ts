import { z } from "zod";
import { generateTransactionId, getAccessToken } from "../../oauth/route";

export async function POST(req: Request) {
  const body = await req.json();
  const schema = z.object({
    customerId: z.string(),
    consumerId: z.string(),
    transactionId: z.string(),
    accessToken: z.string(),
  });

  try {
    const parseResult = schema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        { error: "Invalid input, check your request body." },
        { status: 400 },
      );
    }
    const { accessToken, customerId, transactionId, consumerId } =
      parseResult.data;
    const response = await fetch(
      `https://api.mtn.com/v2/customers/256776239674/plans`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    console.log("pon:", data);
    return Response.json({ message: response }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
