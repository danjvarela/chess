"use client"

import { useCountdownTimer } from "@/hooks/countdown-timer"
import { useGame, useGameOver } from "@/hooks/game"
import { Color } from "chess.js"
import { useEffect } from "react"

export type PlayerinfoProps = {
  name?: string
  color: Color
}

export default function Playerinfo({ name, color }: PlayerinfoProps) {
  const { setGameOver } = useGameOver()
  const { CountdownTimer, timer } = useCountdownTimer({
    expireAfterMinutes: 1,
    autoStart: color === "w",
    onExpire: () => {
      setGameOver(true)
    },
  })
  const { game } = useGame()

  useEffect(() => {
    if (game.turn() !== color) {
      timer.pause()
      return
    }
    timer.resume()
  }, [game])

  return (
    <div className="w-full flex justify-between items-center my-4 bg-sagedark-3 p-2 rounded-lg text-lg">
      <span>{name ?? "Guest"}</span>
      <CountdownTimer />
    </div>
  )
}
