"use client"

import {
  SessionProvider as NextAuthSessionProvider,
  signIn,
} from "next-auth/react"
import { Session } from "next-auth"
import { PropsWithChildren } from "react"
import { redirect, usePathname, useSearchParams } from "next/navigation"

type Props = PropsWithChildren & {
  session: Session | null
}

export default function SessionProvider({ children, session }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthPath = pathname === "/login" || pathname === "/signup"
  const isGuest = session?.isGuest

  if (!session) {
    signIn("credentials")
  }

  if (session && isAuthPath && !isGuest) {
    redirect(searchParams.get("from") ?? "/")
  }

  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
