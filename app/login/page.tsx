"use client"

import Logo from "@/components/logo"
import { Button, Card } from "@radix-ui/themes"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai"
import Link from "@/components/ui/link"

export default function Login() {
  const searchParams = useSearchParams()

  return (
    <div className="w-full flex justify-center items-center pt-32">
      <Card className="w-[300px]" size="4" variant="ghost">
        <div className="w-full flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <Logo />
            <Link
              className="flex gap-2 items-center"
              color="gray"
              href={searchParams.get("from") ?? ""}
            >
              <AiOutlineArrowLeft />
              Go back
            </Link>
          </div>
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
