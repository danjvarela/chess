import { useMutation } from "react-query"
import { collections } from "@/utils/firebase"
import { Game } from "@/types/games"
import { addDoc } from "firebase/firestore"

export const useCreateGame = () => {
  return useMutation(
    async (game: Game) => await addDoc(collections.games, game)
  )
}
