export type GameMode = "vsEngine" | "vsFriend"

export type Game = {
  whitePlayer: string
  blackPlayer: string
  whiteRemainingTime?: number
  blackRemainingTime?: number
  engineDifficulty?: number
  gameStarted?: boolean
  gameOver?: boolean
  mode: GameMode
  timeLimit: number
  fen: string
}
