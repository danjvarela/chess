import { Chessboard as ReactChessboard } from "react-chessboard"
import { useEffect, useState } from "react"
import {
  CustomSquareStyles,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types"
import { kingCheckedStyle, possibleMoveStyle, sharedProps } from "./sharedProps"
import { ChessboardProps } from "./types"
import { Chess } from "chess.js"
import { useEngineColor, useEngineDifficulty, useFen } from "@/hooks/games"
import Spinner from "../ui/spinner"
import { useEngine } from "@/hooks/engine"
import { safeMove } from "@/utils/games"
import GameOverDialog from "../dialogs/game-over"

export default function BrowserChessboard({
  mode,
  id,
  ...props
}: ChessboardProps) {
  const engineColor = useEngineColor(id)
  const { fen, setFen } = useFen(id)
  const [game, setGame] = useState<Chess>()
  const { engine, executeEngineMove } = useEngine()
  const engineDifficulty = useEngineDifficulty(id)
  const [customSquareStyles, setCustomSquareStyles] =
    useState<CustomSquareStyles>({})

  const handleOnSquareClick = (square: Square) => {
    if (!game) return
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
      setCustomSquareStyles(possibleSquaresStyle ?? {})
    }
  }

  const handleOnPieceDragBegin = (_: Piece, square: Square) => {
    handleOnSquareClick(square)
  }

  const handlePieceDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => {
    if (!game) return false

    const move = safeMove(game, {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    })

    // if the move was illegal, we check if the king is checked
    if (move === null) {
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

    setGame(new Chess(game.fen()))
    setCustomSquareStyles({})

    // if mode is vsEngine, execute engine's move
    if (mode === "vsEngine" && engineColor) {
      setTimeout(
        () =>
          executeEngineMove({
            gameState: [game, setGame],
            engine,
            color: engineColor,
            difficulty: engineDifficulty,
          }),
        300
      )
    }

    return true
  }

  useEffect(() => {
    // use the databse to initialize game
    if (!fen || game) return
    setGame(new Chess(fen))
  }, [fen, game])

  useEffect(() => {
    // when the game is initialized,
    // update the fen in the database every move
    if (!game) return
    setFen(game.fen())
  }, [game, setFen])

  if (!game)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    )

  return (
    <>
      <ReactChessboard
        {...props}
        position={game?.fen()}
        onPieceDrop={handlePieceDrop}
        onPieceDragBegin={handleOnPieceDragBegin}
        onSquareClick={handleOnSquareClick}
        customSquareStyles={customSquareStyles}
        {...sharedProps}
      />
      <GameOverDialog game={game} />
    </>
  )
}
