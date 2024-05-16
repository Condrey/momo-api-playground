import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  const schema = z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  });

  try {
    const parseResult = schema.safeParse(body);
    if (!parseResult.success) {
      console.log("malformed request body");
      return Response.json(
        { error: "Invalid input, check your request body." },
        { status: 400 },
      );
    }
    const { clientId, clientSecret } = parseResult.data;
    const url =
      "https://api.mtn.com/v1/oauth/access_token?grant_type=client_credentials";
    const data = `client_id=${clientId}&client_secret=${clientSecret}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });
    if (response.ok) {
      const data = await response.json();
      return Response.json({ message: data }, { status: 200 });
    } else {
      return Response.json(
        { error: "Error getting response" },
        { status: 400 },
      );
    }
  } catch (e) {
    console.error("Server err:", e);
  }
}

export async function getAccessToken(): Promise<string> {
  const clientId = "GakskeG0fhvjjd8GzQJWjHjUT4gWqy6h";
  const clientSecret = "BX1D4tVE76ozEz07";
  const response = await fetch("/api/oauth", {
    method: "POST",
    body: JSON.stringify({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data.message.access_token;
  } else {
    throw new Error("Error getting access token.");
  }
}

export function generateTransactionId(): string {
  const timestamp = Date.now().toString(); // Use current timestamp
  const random = Math.random().toString(36).substring(2, 10); // Use random characters
  return timestamp + random; // Concatenate timestamp and random characters
}
