"use client"

import cn from "@/utils/cn"
import { Button } from "@radix-ui/themes"
import startCase from "lodash/startCase"
import Spinner from "./ui/spinner"
import { signIn } from "next-auth/react"
import { useState } from "react"

type Props = React.ComponentProps<typeof Button> & {
  provider: Parameters<typeof signIn>[0]
}

export default function AuthButton({ className, provider, ...props }: Props) {
  const [signingIn, setSigningIn] = useState(false)

  return (
    <Button
      size="3"
      onClick={() => {
        setSigningIn(true)
        signIn(provider)
      }}
      className={cn("w-full", className)}
      disabled={signingIn}
      aria-disabled={signingIn}
      {...props}
    >
      {signingIn && <Spinner className="w-4 h-4" />}
      Continue with {startCase(provider)}
    </Button>
  )
}
