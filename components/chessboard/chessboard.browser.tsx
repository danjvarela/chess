"use client"

import { Chessboard as ReactChessboard } from "react-chessboard"
import { useCallback, useEffect, useState } from "react"
import { Chess } from "chess.js"
import {
  BoardOrientation,
  CustomSquareStyles,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types"
import { kingCheckedStyle, possibleMoveStyle, sharedProps } from "./sharedProps"
import { useIsClient } from "usehooks-ts"
import Loading from "@/app/loading"
import {
  useEngine,
  useEngineDifficulty,
  useEngineFen,
  useEnginePlayerColor,
} from "@/hooks/engine-game"
import { DeviceSpecificChessboardProps } from "./types"
import GameOverDialog from "../game-over-dialog"

export default function BrowserChessboard({
  mode,
}: DeviceSpecificChessboardProps) {
  const { fen, setFen } = useEngineFen()
  const [game, setGame] = useState(new Chess(fen))
  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>({})
  const isClient = useIsClient()
  const { engine, executeEngineMove } = useEngine()
  const { difficulty } = useEngineDifficulty()
  const { playerColor } = useEnginePlayerColor()
  const vsEngine = mode === "vsEngine"

  const handleOnSquareClick = useCallback(
    (square: Square) => {
      const pieceOnClickedSquare = game.get(square)

      // set moveFrom
      // highlight the clicked square
      // highlight possible squares
      if (pieceOnClickedSquare.color === game.turn()) {
        const possibleSquaresStyle = game
          .moves({ square, verbose: true })
          .map((move) => move.to)
          .reduce(
            (acc, square) => ({
              ...acc,
              [square]: possibleMoveStyle,
            }),
            {}
          )
        setCustomSquareStyles(possibleSquaresStyle)
      }
    },
    [game]
  )

  const handleOnPieceDragBegin = (_: Piece, square: Square) => {
    handleOnSquareClick(square)
  }

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      // prevent player from making a move on behalf of the engine
      if (vsEngine && game.turn() !== playerColor) return false

      try {
        game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        })

        setFen(game.fen())
        setCustomSquareStyles({})
        return true
      } catch (err) {
        if (game.inCheck()) {
          const kingSquare = game
            .board()
            .flat()
            .find(
              (position) =>
                position?.color === game.turn() && position.type === "k"
            )?.square
          if (!kingSquare) return false

          setCustomSquareStyles({ [kingSquare]: kingCheckedStyle })
        }
        return false
      }
    },
    [game, engine]
  )

  useEffect(() => {
    setGame(new Chess(fen))
  }, [fen])

  useEffect(() => {
    if (vsEngine && game.turn() !== playerColor) {
      executeEngineMove({ engine, game, setGame, difficulty })
    }
  }, [game, vsEngine, difficulty, engine])

  if (!isClient) {
    return <Loading />
  }

  return (
    <>
      <ReactChessboard
        position={game.fen()}
        onPieceDrop={handlePieceDrop}
        onPieceDragBegin={handleOnPieceDragBegin}
        onSquareClick={handleOnSquareClick}
        customSquareStyles={customSquareStyles}
        boardOrientation={playerColor === "w" ? "white" : "black"}
        {...sharedProps}
      />
      <GameOverDialog game={game} />
    </>
  )
}
