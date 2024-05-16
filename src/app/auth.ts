import prisma from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google, GitHub],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const { id } = user;
      const roleUser = await prisma.user.findUnique({ where: { id } });

      if (!roleUser) {
        // Handle the case where the user is not found
        console.error(`User with id ${id} not found in the database.`);
        throw new Error("User not found");
      }

      // Update session with user data
      session.user = {
        ...session.user,
        id: id,
        role: roleUser.role || "USER",
      };

      return session;
    },
  },
});
