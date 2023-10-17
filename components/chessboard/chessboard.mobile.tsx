import { Chessboard as ReactChessboard } from "react-chessboard"
import {
  kingCheckedStyle,
  moveFromSquareStyle,
  possibleMoveStyle,
  sharedProps,
} from "./sharedProps"
import { useCallback, useEffect, useState } from "react"
import {
  CustomSquareStyles,
  PromotionPieceOption,
} from "react-chessboard/dist/chessboard/types"
import { Square, Chess, PieceSymbol } from "chess.js"
import { ChessboardProps } from "./types"
import { useFen } from "@/hooks/games"
import Spinner from "../ui/spinner"

export default function MobileChessboard({
  mode,
  id,
  ...props
}: ChessboardProps) {
  const { fen, setFen } = useFen(id)
  const [game, setGame] = useState<Chess>()
  const [showPromotionDialog, setShowPromotionDialog] = useState(false)
  const [moveFrom, setMoveFrom] = useState<Square>()
  const [promotionToSquare, setPromotionToSquare] = useState<Square>()

  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>()

  const reset = () => {
    setPromotionToSquare(undefined)
    setMoveFrom(undefined)
    setCustomSquareStyles({})
    setShowPromotionDialog(false)
  }

  const makeMove = useCallback(
    (from: Square, to: Square, promotion?: PieceSymbol) => {
      try {
        game?.move({ from, to, promotion })
        setGame(new Chess(game?.fen()))
        reset()
      } catch (err) {}
    },
    [game]
  )

  const handleOnSquareClick = (square: Square) => {
    const pieceOnClickedSquare = game?.get(square)

    const foundMove = game
      ?.moves({ square: moveFrom, verbose: true })
      .find((move) => move.to === square)

    const isPromotion =
      (foundMove?.color === "w" &&
        foundMove.piece === "p" &&
        square[1] === "8") ||
      (foundMove?.color === "b" && foundMove.piece === "p" && square[1] === "1")

    // a pawn is to be promoted, open promotion dialog
    if (isPromotion) {
      setShowPromotionDialog(true)
      setPromotionToSquare(square)
      return
    }

    // moveFrom is already set and the square clicked is among the possible moves
    // then attempt to make the move
    if (moveFrom && foundMove) {
      makeMove(moveFrom, square)
    }

    // player executed an illegal move and the king is in check
    if (moveFrom && !foundMove && game?.isCheck()) {
      const kingSquare = game
        ?.board()
        .flat()
        .find(
          (position) =>
            position?.color === game?.turn() && position.type === "k"
        )?.square

      if (!kingSquare) return
      setCustomSquareStyles({
        [kingSquare]: kingCheckedStyle,
      })
    }

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
      setMoveFrom(square)
      setCustomSquareStyles({
        [square]: moveFromSquareStyle,
        ...possibleSquaresStyle,
      })
    }
  }

  const handleOnPromotionPieceSelect = (piece?: PromotionPieceOption) => {
    if (piece && moveFrom && promotionToSquare) {
      makeMove(
        moveFrom,
        promotionToSquare,
        piece[1].toLowerCase() as PieceSymbol
      )
    }

    // no piece is selected means the dialog is cancelled
    // so we just reset and dont make a move
    reset()
    return true
  }

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
      position={fen}
      animationDuration={200}
      arePiecesDraggable={false}
      onSquareClick={handleOnSquareClick}
      customSquareStyles={customSquareStyles}
      showPromotionDialog={showPromotionDialog}
      promotionToSquare={promotionToSquare}
      onPromotionPieceSelect={handleOnPromotionPieceSelect}
      {...sharedProps}
    />
  )
}
