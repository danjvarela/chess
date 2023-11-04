"use client"

import GameMenu from "@/components/game-menu"
import { Chessboard } from "react-chessboard"

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="aspect-square h-[90%] mx-auto relative">
        <Chessboard />

        <div className="absolute top-0 -left-[300px] w-[300px] p-4 pr-8">
          <GameMenu />
        </div>
      </div>
    </div>
  )
}
