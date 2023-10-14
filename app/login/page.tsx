"use client"

import Logo from "@/components/logo"
import { Card } from "@radix-ui/themes"
import { useSearchParams } from "next/navigation"
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft"
import Link from "@/components/ui/link"
import AuthButton from "@/components/auth-button"

export default function Login() {
  const searchParams = useSearchParams()

  return (
    <div className="w-full flex justify-center items-center pt-32">
      <Card className="w-[320px]" size="4" variant="ghost">
        <div className="w-full flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <Link
              className="flex gap-2 items-center"
              color="gray"
              href={searchParams.get("from") ?? "/"}
            >
              <AiOutlineArrowLeft />
              Go back
            </Link>
          </div>
          <div className="flex flex-col w-full gap-4">
            <AuthButton provider="google" />
            <AuthButton provider="facebook" />
          </div>
        </div>
      </Card>
    </div>
  )
}
