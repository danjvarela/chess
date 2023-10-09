import { Chess } from "chess.js"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

type GameState = {
  fen: string
}

export const DEFAULT_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const useGameStore = create(
  subscribeWithSelector<GameState>(() => ({ fen: DEFAULT_FEN }))
)

export const useChessGame = () => {
  const fen = useGameStore((state) => state.fen)

  return {
    game: new Chess(fen),
    setFen: (fen: string) => useGameStore.setState({ fen }),
  }
}
