import { GameMode } from "@/types/games"
import { Chessboard } from "react-chessboard"

export type ChessboardProps = Omit<
  React.ComponentProps<typeof Chessboard>,
  "id"
> & {
  id: string
  mode: GameMode | "configurable"
}
