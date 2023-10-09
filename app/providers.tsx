"use client"

import { PropsWithChildren } from "react"
import { Theme } from "@radix-ui/themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

type Props = PropsWithChildren & {
  session: Session | null
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <Theme appearance="dark" accentColor="jade">
        {children}
      </Theme>
    </SessionProvider>
  )
}
