"use client"

import Chessboard from "@/components/chessboard"
import { useEngineFen } from "@/hooks/engine-game-settings"
import { useGame } from "@/hooks/game"
import { useEffect } from "react"

export default function VsComputer() {
  const { game, setGame } = useGame()
  const { fen, setFen } = useEngineFen()

  useEffect(() => {
    console.log("fen", fen)
  }, [fen])

  return (
    <div className="w-[700px] h-full flex justify-center items-center">
      <Chessboard />
    </div>
  )
}
