import { Chess } from "chess.js"

export const safeMove = (
  game: Chess,
  move:
    | string
    | {
        from: string
        to: string
        promotion?: string
      }
) => {
  try {
    return game.move(move)
  } catch (err) {
    return null
  }
}
