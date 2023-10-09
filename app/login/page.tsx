"use client"

import { Button } from "@radix-ui/themes"
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div>
      <Button onClick={() => signIn("google")}>Login with Google</Button>
    </div>
  )
}
