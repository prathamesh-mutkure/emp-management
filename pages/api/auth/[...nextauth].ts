import { loginUser } from "@/helper/apis/auth-apis";
import { AxiosError } from "axios";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const authData = await loginUser(username, password);

        if (authData.token) {
          return {
            username,
            token: authData.token,
          };
        }

        if (typeof authData === "string") {
          throw new Error(authData);
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
