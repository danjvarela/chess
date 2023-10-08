"use client"

import Chessboard from "@/components/chessboard"
import GameSettings from "@/components/game-settings"
import { Card } from "@radix-ui/themes"

export default function VsComputer() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8 px-2 gap-4">
      <div className="flex w-full justify-between max-w-[730px]">
        <Card size="1" className="w-full flex justify-center">
          <span className="font-bold text-xs md:text-base">Computer</span>
        </Card>
      </div>

      <div className="relative w-full max-w-[730px] min-h-[730px] bg-sage-50">
        <Chessboard mode="vsEngine" />

        <div className="absolute w-[250px] left-full inset-0 ml-8 flex flex-col gap-8">
          <GameSettings />
        </div>
      </div>

      <div className="flex w-full justify-between max-w-[730px]">
        <Card size="1" className="w-full flex justify-center">
          <span className="font-bold text-xs md:text-base">You</span>
        </Card>
      </div>
    </div>
  )
}
