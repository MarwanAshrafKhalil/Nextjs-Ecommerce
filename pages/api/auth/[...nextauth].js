import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Router } from "next/router";

const adminEmails = ["marwan.a.k.1997@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }) {
      const isAllowedToSignIn = adminEmails.includes(user?.email);

      if (isAllowedToSignIn) {
        return true;
      } else {
        // need to add route to the homepage in case of false validation
        return false;
      }
    },
    // session: ({ session, token, user }) => {
    //   if (adminEmails.includes(session?.user?.email)) {
    //     return session;
    //   } else {
    //     return false;
    //   }
    // },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
