import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "./providers"
import { getAuth } from "@/lib/nextauth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chess",
  description: "A simple Chess app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuth()

  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen relative")}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
