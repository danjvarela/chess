import { useMutation } from "react-query"
import { collections } from "@/utils/firebase"
import { Game } from "@/types/games"
import { addDoc, doc, updateDoc } from "firebase/firestore"
import { useDocument } from "react-firebase-hooks/firestore"
import { useCallback } from "react"
import { pickDocumentHookProps, pickMutationProps } from "./utils"

export const useCreateGame = () => {
  const mutation = useMutation(
    async (game: Game) => await addDoc(collections.games, game)
  )
  return pickMutationProps(mutation)
}

export const useGame = (id: string) => {
  const hookValue = useDocument(doc(collections.games, id))
  return pickDocumentHookProps(hookValue)
}

export const useUpdateGame = (id: string) => {
  const mutation = useMutation(
    async (gameDetails: Partial<Game>) =>
      await updateDoc(doc(collections.games, id), gameDetails)
  )
  return pickMutationProps(mutation)
}

export const useFen = (gameId: string) => {
  const { data } = useGame(gameId)
  const { mutate } = useUpdateGame(gameId)
  const fen = data?.data()?.fen

  const setFen = useCallback(
    (fen: string) => {
      mutate({ fen })
    },
    [mutate]
  )

  return { fen, setFen }
}
