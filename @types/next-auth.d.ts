// @auth/core/adapters
// types.d.ts

import { Role } from ".prisma/client";
import { DefaultSession } from "next-auth";
import "types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
