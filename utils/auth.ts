import { AuthOptions, User } from "next-auth"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { env } from "@/env.mjs"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator"
import { v4 as uuidv4 } from "uuid"

const createAnonymousUser = (): User => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: "_",
    length: 3,
    style: "lowerCase",
  }

  const handle = uniqueNamesGenerator(customConfig)
  const realName = handle.split("_").slice(1).join(" ")
  const uuid = uuidv4()

  return {
    id: uuid,
    email: `${handle}@guest.com`,
    name: realName,
    image: "",
    isGuest: true,
  }
}

export const authOptions: AuthOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  providers: [
    CredentialsProvider({
      name: "Guest",
      credentials: {},
      async authorize() {
        return createAnonymousUser()
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.isGuest) token.isGuest = true
      return token
    },
    async session({ token, session }) {
      if (token.isGuest) {
        session.isGuest = true
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/login",
  },
}
