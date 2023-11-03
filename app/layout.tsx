import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import { cn } from "@/utils/cn"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chess",
  description: "A simple Chess app",
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
          "dark text-foreground bg-background min-h-screen"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
