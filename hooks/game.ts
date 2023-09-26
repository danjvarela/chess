import { Chess } from "chess.js"
import { useEffect, useState } from "react"
import { create } from "zustand"

type GameState = {
  game: Chess
  actions: {
    setGame: (chess: Chess) => void
  }
}

const useGameStore = create<GameState>((set) => ({
  game: new Chess(),
  actions: {
    setGame: (game: Chess) => set(() => ({ game })),
  },
}))

export const useGame = () => {
  const { game: gameFromState, setGame: setGameFromState } = useGameStore(
    (state) => ({
      game: state.game,
      setGame: state.actions.setGame,
    })
  )
  // use dispatcher function from useState
  // to take advantage of it's call signature
  const [game, setGame] = useState(gameFromState)

  useEffect(() => {
    setGameFromState(game)
  }, [game])

  return { game, setGame }
}
