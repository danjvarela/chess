import { Chessboard as ReactChessboard } from "react-chessboard"
import { useCallback, useEffect, useState } from "react"
import {
  CustomSquareStyles,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types"
import { kingCheckedStyle, possibleMoveStyle, sharedProps } from "./sharedProps"
import { ChessboardProps } from "./types"
import { Chess } from "chess.js"
import { useFen } from "@/hooks/games"
import Spinner from "../ui/spinner"

export default function BrowserChessboard({
  mode,
  id,
  ...props
}: ChessboardProps) {
  const { fen, setFen } = useFen(id)
  const [game, setGame] = useState<Chess>()
  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>({})

  const handleOnSquareClick = useCallback(
    (square: Square) => {
      const pieceOnClickedSquare = game?.get(square)

      // set moveFrom
      // highlight the clicked square
      // highlight possible squares
      if (pieceOnClickedSquare?.color === game?.turn()) {
        const possibleSquaresStyle = game
          ?.moves({ square, verbose: true })
          .map((move) => move.to)
          .reduce(
            (acc, square) => ({
              ...acc,
              [square]: possibleMoveStyle,
            }),
            {}
          )
        setCustomSquareStyles(possibleSquaresStyle ?? {})
      }
    },
    [game]
  )

  const handleOnPieceDragBegin = (_: Piece, square: Square) => {
    handleOnSquareClick(square)
  }

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      if (!game) return false
      try {
        game?.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        })

        setGame(new Chess(game?.fen()))
        setCustomSquareStyles({})
        return true
      } catch (err) {
        if (game?.inCheck()) {
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

  useEffect(() => {
    // use the databse to initialize game
    if (fen && !game) {
      setGame(new Chess(fen))
    }
  }, [fen])

  useEffect(() => {
    // when the game is initialized,
    // update the fen in the database every move
    if (game) {
      setFen(game.fen())
    }
  }, [game])

  if (!game)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    )

  return (
    <ReactChessboard
      {...props}
      position={game?.fen()}
      onPieceDrop={handlePieceDrop}
      onPieceDragBegin={handleOnPieceDragBegin}
      onSquareClick={handleOnSquareClick}
      customSquareStyles={customSquareStyles}
      {...sharedProps}
    />
  )
}
