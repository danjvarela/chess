"use client"

import { useCountdownTimer } from "@/hooks/countdown-timer"
import { useGame } from "@/hooks/game"
import { Color } from "chess.js"
import { useEffect } from "react"

export type PlayerinfoProps = {
  name?: string
  color: Color
}

export default function Playerinfo({ name, color }: PlayerinfoProps) {
  const { CountdownTimer, timer } = useCountdownTimer({
    expireAfterMinutes: 15,
    autoStart: color === "w",
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
