"use client"

import { db } from "@/utils/firebase"
import { Button } from "@radix-ui/themes"
import { collection, query } from "firebase/firestore"
import { signOut, useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"

export default function Home() {
  const session = useSession()
  const [users, loading, error] = useCollection(query(collection(db, "users")))

  return (
    <div className="w-[300px]">
      {users?.docs[0].data().email}
      <div>{session?.data?.user?.email}</div>
      <Button onClick={() => signOut()}>Signout</Button>
    </div>
  )
}
