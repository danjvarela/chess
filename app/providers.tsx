"use client"

import { PropsWithChildren } from "react"
import { Theme } from "@radix-ui/themes"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import AuthHandler from "@/components/auth-handler"

type Props = PropsWithChildren & {
  session: Session | null
}

export default function Providers({ children, session }: Props) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Theme accentColor="jade">
        <SessionProvider session={session}>
          {children}
          <AuthHandler />
        </SessionProvider>
      </Theme>
    </ThemeProvider>
  )
}
