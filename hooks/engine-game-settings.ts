import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"
import omit from "lodash/omit"
import { Color } from "chess.js"
import usePersistStore from "./persist-store"

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const DEFAULT_ENGINE_DIFFICULTY = 2

export type EngineGameSettings = {
  fen: string
  gameStarted: boolean
  playerColor: Color
  gameOver: boolean
  difficulty: number

  actions: {
    setFen: (fen: string) => void
    setGameStarted: (gameStarted: boolean) => void
    setPlayerColor: (playerColor: Color) => void
    setGameOver: (gameOver: boolean) => void
    setDifficulty: (difficulty: number) => void
  }
}

const useEngineGameStore = create<EngineGameSettings>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        fen: DEFAULT_FEN,
        gameStarted: false,
        difficulty: DEFAULT_ENGINE_DIFFICULTY,
        playerColor: "w",
        gameOver: false,
        actions: {
          setFen: (fen: string) => set({ fen }),
          setGameStarted: (gameStarted: boolean) => set({ gameStarted }),
          setPlayerColor: (playerColor: Color) => set({ playerColor }),
          setGameOver: (gameOver: boolean) => set({ gameOver }),
          setDifficulty: (difficulty: number) => set({ difficulty }),
        },
      }),
      {
        name: "chess_engine_game_settings",
        partialize: (state) => omit(state, ["actions"]),
        skipHydration: true,
      }
    )
  )
)

export const useEngineFen = () => {
  return usePersistStore(useEngineGameStore, (state) => ({
    fen: state.fen,
    setFen: state.actions.setFen,
  }))
}

export const useEngineGameStarted = () => {
  return usePersistStore(useEngineGameStore, (state) => ({
    gameStarted: state.gameStarted,
    setGameStarted: state.actions.setGameStarted,
  }))
}
