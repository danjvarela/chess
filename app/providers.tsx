"use client"

import { PropsWithChildren } from "react"
import { Theme } from "@radix-ui/themes"

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Theme appearance="dark" accentColor="jade">
      {children}
    </Theme>
  )
}
