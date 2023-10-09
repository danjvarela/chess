"use client"

import { Chessboard as ReactChessboard } from "react-chessboard"
import { useCallback, useState, useRef } from "react"
import {
  CustomSquareStyles,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types"
import { kingCheckedStyle, possibleMoveStyle, sharedProps } from "./sharedProps"
import { DeviceSpecificChessboardProps } from "./types"
import { Chess } from "chess.js"

export default function BrowserChessboard({
  mode,
}: DeviceSpecificChessboardProps) {
  const [game, setGame] = useState(new Chess())
  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>({})

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

  return (
    <ReactChessboard
      position={game.fen()}
      onPieceDrop={handlePieceDrop}
      onPieceDragBegin={handleOnPieceDragBegin}
      onSquareClick={handleOnSquareClick}
      customSquareStyles={customSquareStyles}
      {...sharedProps}
    />
  )
}
