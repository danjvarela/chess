"use client"

import Chessboard from "@/components/chessboard"
import GameSettings from "@/components/game-settings"
import cn from "@/utils/cn"
import { Card } from "@radix-ui/themes"

export default function VsComputer() {
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center py-8 px-2 gap-4",
        "md:max-w-2xl mx-auto"
      )}
    >
      <div className="flex justify-end w-full">
        <GameSettings />
      </div>

      <Card size="1" className="w-full flex justify-center">
        <span className="font-bold text-xs md:text-base">Computer</span>
      </Card>

      <div className="w-full aspect-square bg-sage-50">
        <Chessboard mode="vsEngine" />
      </div>

      <Card size="1" className="w-full flex justify-center">
        <span className="font-bold text-xs md:text-base">You</span>
      </Card>
    </div>
  )
}
