import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import facebook from "next-auth/providers/facebook";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { db } from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [github, google, facebook],
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      isAdmin: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}
