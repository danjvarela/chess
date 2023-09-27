import cn from "@/utils/cn"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chess",
  description: "A simple chess app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-sagedark-1 text-tealdark-12 w-screen h-screen flex flex-col"
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
