"use client"

import { useCreateGame } from "@/hooks/games"
import { Game } from "@/types/games"
import { Button } from "@radix-ui/themes"

const testData: Game = {
  whitePlayer: "Alice",
  blackPlayer: "Bob",
  whiteRemainingTime: 600, // in seconds
  blackRemainingTime: 600, // in seconds
  engineDifficulty: 3, // optional
  gameStarted: true,
  gameOver: false,
  mode: "vsFriend",
  timeLimit: 900, // in seconds
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
}

export default function Scratch() {
  const { mutate, data: createdGameRef, isLoading } = useCreateGame()

  const createGame = () => {
    mutate(testData)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Button onClick={createGame} disabled={isLoading}>
        Create a Game
      </Button>
      <div className="text-wrap max-w-xs">
        {JSON.stringify(createdGameRef?.id)}
      </div>
    </div>
  )
}
