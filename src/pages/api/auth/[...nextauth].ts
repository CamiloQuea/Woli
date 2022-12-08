import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import argon from "argon2";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;

      }
      return token;
    },
    // session({ session, token,user }) {

    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   session.user = { id: token.id, name: token.name, email: token.email,image: user.image };
    //   return session;
    // },
    session: ({ session, token }) => {
      session.user = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
      };
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (!user) return null;

        const isCorrectPassword = await argon.verify(
          user?.password || "",
          credentials?.password || ""
        );

        if (!isCorrectPassword) return null;

        return {
          id: user.id,
          name: user.username,
        };
      },
    }),
  ],
  pages: {
    signOut: "/",
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  // session: {
  //   strategy: "jwt",
  // },
};

export default NextAuth(authOptions);
