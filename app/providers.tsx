"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"

type Props = React.PropsWithChildren & {
  session: Session | null
}

const queryClient = new QueryClient()

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
