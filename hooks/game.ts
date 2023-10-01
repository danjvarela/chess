import { Chess } from "chess.js"
import { useEffect, useState } from "react"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

type GameState = {
  game: Chess
  gameOver: boolean
  actions: {
    setGame: (chess: Chess) => void
    setGameOver: (gameOver: boolean) => void
  }
}

const useGameStore = create(
  subscribeWithSelector<GameState>((set, get) => ({
    game: new Chess(),
    gameOver: false,
    actions: {
      setGame: (game: Chess) => set(() => ({ game })),
      setGameOver: (gameOver: boolean) => set(() => ({ gameOver })),
    },
  }))
)

// set game over automatically on checkmate
useGameStore.subscribe(
  (state) => state.game,
  (game) => {
    useGameStore.setState({ gameOver: game.isGameOver() })
  }
)

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

  return { game: gameFromState, setGame }
}

export const useGameOver = () =>
  useGameStore((state) => ({
    gameOver: state.gameOver,
    setGameOver: state.actions.setGameOver,
  }))
