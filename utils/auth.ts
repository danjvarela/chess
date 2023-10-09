import { AuthOptions } from "next-auth"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { env } from "@/env.mjs"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}
