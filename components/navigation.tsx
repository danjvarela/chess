"use client"

import { signOut, useSession } from "next-auth/react"
import Logo from "./logo"
import { Text } from "@radix-ui/themes"
import { usePathname } from "next/navigation"
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading"
import Link from "@/components/ui/link"

export default function Navigation() {
  const session = useSession()
  const isGuest = session?.data?.isGuest
  const name = session?.data?.user?.name
  const pathname = usePathname()

  const loginMessage = (() => {
    if (isGuest) return "Logged in as Guest"
    return `Logged in as ${name}`
  })()

  const authLink = (() => {
    if (!session || isGuest)
      return (
        <Link href={`/login?from=${pathname}`}>Continue with an account</Link>
      )

    return (
      <Link
        href=""
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Logout
      </Link>
    )
  })()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Link href="/">
        <Logo className="mb-4" />
      </Link>
      {session.status === "loading" ? (
        <AiOutlineLoading className="animate-spin" />
      ) : (
        <div className="flex flex-col items-center gap-1">
          <Text color="gray">{loginMessage}</Text>
          {authLink}
        </div>
      )}
    </div>
  )
}
