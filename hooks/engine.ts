import Engine from "@/utils/engine"
import { Chess, Color } from "chess.js"
import { useCallback, useEffect, useState } from "react"
import clamp from "lodash/clamp"
import sample from "lodash/sample"
import { MAX_ENGINE_DIFFICULTY, MIN_ENGINE_DIFFICULTY } from "@/utils/constants"
import { safeMove } from "@/utils/games"
import { Square } from "chess.js"

const mapRange = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => {
  const clampedVal = clamp(value, fromMin, fromMax)

  // Calculate the percentage of the value within the source range
  const percentage = (clampedVal - fromMin) / (fromMax - fromMin)

  // Map the percentage to the target range
  return toMin + percentage * (toMax - toMin)
}

export const useEngine = () => {
  const [engine, setEngine] = useState<Engine>()

  useEffect(() => {
    if (engine) return
    setEngine(new Engine(new Worker("/stockfish.js")))
  }, [engine])

  const executeEngineMove = useCallback(
    ({
      gameState: [game, setGame],
      difficulty = MIN_ENGINE_DIFFICULTY,
      color,
      engine,
    }: {
      gameState: ReturnType<typeof useState<Chess>>
      difficulty?: number
      color: Color
      engine?: Engine
    }) => {
      if (!engine || !game || game.turn() !== color) return

      const unsub = engine.onMessage(({ bestMove }) => {
        const percentage = mapRange(
          difficulty,
          MIN_ENGINE_DIFFICULTY,
          MAX_ENGINE_DIFFICULTY,
          60,
          100
        )

        const randomMove = sample(game.moves({ verbose: true }))

        const randomPercentage = Math.random() * 100

        if (randomPercentage < percentage) {
          if (!bestMove) return
          const from = bestMove.substring(0, 2)
          const pieceTobeMoved = game.get(from as Square).color
          if (pieceTobeMoved !== color) return
          safeMove(game, {
            from,
            to: bestMove.substring(2, 4),
            promotion: bestMove.substring(4, 5) || undefined,
          })
        } else {
          if (!randomMove) return
          const pieceTobeMoved = game.get(randomMove.from).color
          if (pieceTobeMoved !== color) return
          safeMove(game, {
            from: randomMove.from,
            to: randomMove.to,
            promotion: randomMove.promotion,
          })
        }

        setGame(() => {
          unsub()
          return new Chess(game.fen())
        })
      })

      engine.evaluatePosition(game.fen(), difficulty)
    },
    []
  )

  return { engine, executeEngineMove }
}
