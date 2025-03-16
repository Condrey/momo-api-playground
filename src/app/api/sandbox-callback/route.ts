import { error } from "console";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    console.log("The response is: ", body);
  } catch (e) {
    console.error(error);
  }
}
