import "server-only";

import { auth } from "@/app/auth";
import { cache } from "react";

export const verifySession = cache(async () => {
  const session = await auth();
  return session;
});
