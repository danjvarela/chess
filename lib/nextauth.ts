import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { env } from "@/env.mjs"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export const authOptions: AuthOptions = {
  adapter: FirestoreAdapter(),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.id) {
        token.userId = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token?.userId) {
        session.user.id = token.userId as string
      }
      return session
    },
  },
}

export async function getAuth() {
  return await getServerSession(authOptions)
}
