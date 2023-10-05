"use client"

import { Chessboard as ReactChessboard } from "react-chessboard"
import { useCallback, useState } from "react"
import { Chess } from "chess.js"
import {
  CustomSquareStyles,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types"
import { useGame } from "@/hooks/game"
import { kingCheckedStyle, sharedProps } from "./sharedProps"
import { useIsClient } from "usehooks-ts"
import Loading from "@/app/loading"

export default function BrowserChessboard() {
  const { game, setGame } = useGame()
  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>({})
  const isClient = useIsClient()

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      try {
        game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        })

        setGame(new Chess(game.fen()))
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
    [game]
  )

  if (!isClient) {
    return <Loading />
  }

  return (
    <ReactChessboard
      position={game.fen()}
      onPieceDrop={handlePieceDrop}
      customSquareStyles={customSquareStyles}
      {...sharedProps}
    />
  )
}
