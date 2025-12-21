import "server-only";

import { auth } from "@/app/auth";
import { Session } from "next-auth";
import { cache } from "react";

export const verifySession = cache(async () => {
  const session: Session | null = await auth();

  return session;
});
