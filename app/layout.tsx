import "./globals.css"
import "@radix-ui/themes/styles.css"
import type { Metadata } from "next"
import Providers from "./providers"
import Footer from "@/components/footer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

export const metadata: Metadata = {
  title: "Chess",
  description: "A simple chess app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <div className="container mx-auto min-h-screen flex flex-col">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
