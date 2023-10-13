"use client"

import { signIn, useSession } from "next-auth/react"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AuthHandler() {
  const session = useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthPath = pathname === "/login" || pathname === "/signup"
  const isAuthenticated = session.status === "authenticated"
  const isGuest = session.data?.isGuest

  useEffect(() => {
    if (!isAuthenticated) {
      signIn("credentials")
    }

    if (isAuthenticated && isAuthPath && !isGuest) {
      redirect(searchParams.get("from") ?? "/")
    }
  }, [isAuthenticated, isAuthPath, isGuest])

  return null
}
