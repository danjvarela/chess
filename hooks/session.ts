import { useQuery } from "react-query"
import { getSession } from "next-auth/react"

export function useSession() {
  return useQuery(["session"], async () => await getSession())
}
