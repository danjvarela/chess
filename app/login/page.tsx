"use client"

import Logo from "@/components/logo"
import { Button, Card } from "@radix-ui/themes"
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="w-full flex justify-center items-center pt-32">
      <Card className="w-[300px]" size="4">
        <div className="w-full flex flex-col items-center gap-12">
          <Logo />
          <div className="flex flex-col w-full gap-4">
            <Button
              size="3"
              onClick={() => signIn("google")}
              className="w-full"
            >
              Continue with Google
            </Button>
            <Button
              size="3"
              onClick={() => signIn("facebook")}
              className="w-full"
            >
              Continue with Facebook
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
