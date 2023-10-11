"use client"

import { PropsWithChildren } from "react"
import { Theme } from "@radix-ui/themes"
import SessionProvider from "./session-provider"
import { Session } from "next-auth"

type Props = PropsWithChildren & {
  session: Session | null
}

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <Theme appearance="dark" accentColor="jade">
        {children}
      </Theme>
    </SessionProvider>
  )
}
