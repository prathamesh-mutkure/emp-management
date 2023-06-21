import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    token: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
      token: string;
    };
  }
}
