import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"
import omit from "lodash/omit"
import { Chess, Color } from "chess.js"
import usePersistStore from "./persist-store"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import Engine from "@/utils/chess-engine"

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export const MIN_ENGINE_DIFFICULTY = 2
export const MAX_ENGINE_DIFFICULTY = 10

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
        difficulty: MIN_ENGINE_DIFFICULTY,
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

export const useEngineDifficulty = () => {
  return usePersistStore(useEngineGameStore, (state) => ({
    difficulty: state.difficulty,
    setDifficulty: state.actions.setDifficulty,
  }))
}

export const useEnginePlayerColor = () => {
  return usePersistStore(useEngineGameStore, (state) => ({
    playerColor: state.playerColor,
    setPlayerColor: state.actions.setPlayerColor,
  }))
}

export const useEngine = () => {
  const [engine, setEngine] = useState<Engine>()
  const { playerColor } = useEnginePlayerColor()

  useEffect(() => {
    setEngine(new Engine(new Worker("/stockfish.js")))
  }, [])

  const executeEngineMove = useCallback(
    ({
      engine,
      game,
      setGame,
      difficulty,
    }: {
      engine?: Engine
      difficulty: number
      game: Chess
      setGame: Dispatch<SetStateAction<Chess>>
    }) => {
      if (!engine) return
      if (!game.isGameOver() && game.turn() === playerColor) return

      const removeMessageListener = engine.onMessage(({ bestMove }) => {
        try {
          if (bestMove) {
            game.move({
              from: bestMove.substring(0, 2),
              to: bestMove.substring(2, 4),
              promotion: bestMove.substring(4, 5),
            })

            setGame(() => {
              // so the event listeners won't pile up
              removeMessageListener()
              return new Chess(game.fen())
            })
          }
        } catch (err) {}
      })

      engine.evaluatePosition(game.fen(), difficulty)
    },
    []
  )

  return { engine, executeEngineMove }
}
