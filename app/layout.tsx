import "./globals.css"
import "@radix-ui/themes/styles.css"
import type { Metadata } from "next"
import Providers from "./providers"
import Footer from "@/components/footer"

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="container mx-auto min-h-screen flex flex-col">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
