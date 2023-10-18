import { useMutation } from "react-query"
import { collections } from "@/utils/firebase"
import { Game } from "@/types/games"
import { addDoc, doc, updateDoc } from "firebase/firestore"
import { useDocument } from "react-firebase-hooks/firestore"
import { useCallback, useMemo } from "react"
import { pickDocumentHookProps, pickMutationProps } from "./utils"
import { useSession } from "next-auth/react"
import { Color } from "chess.js"
import { ENGINE_PLAYER } from "@/utils/constants"

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

export const usePlayerColor = (gameId: string): Color | undefined => {
  const session = useSession()
  const playerId = session?.data?.user?.id
  const { data: gameInfo } = useGame(gameId)
  const gameData = gameInfo?.data()

  return useMemo(() => {
    if (playerId === gameData?.blackPlayer) return "b"
    if (playerId === gameData?.whitePlayer) return "w"
  }, [gameData, playerId])
}

export const useEngineColor = (gameId: string): Color | undefined => {
  const { data: gameInfo } = useGame(gameId)
  const gameData = gameInfo?.data()

  return useMemo(() => {
    if (gameData?.mode !== "vsEngine") return
    if (gameData?.blackPlayer === ENGINE_PLAYER) return "b"
    if (gameData?.whitePlayer === ENGINE_PLAYER) return "w"
  }, [gameData])
}

export const useEngineDifficulty = (gameId: string) => {
  const { data: gameInfo } = useGame(gameId)
  return gameInfo?.data()?.engineDifficulty
}
