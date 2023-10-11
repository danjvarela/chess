"use client"

import Chessboard from "@/components/chessboard"
import GameSettings from "@/components/game-settings"
import Link from "@/components/ui/link"
import cn from "@/utils/cn"
import { Card } from "@radix-ui/themes"
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft"

export default function VsComputer() {
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center py-8 px-2 gap-4",
        "md:max-w-2xl mx-auto"
      )}
    >
      <div className="flex justify-between w-full items-center">
        <Link
          color="gray"
          href="/"
          className="flex items-center gap-2"
          size="2"
        >
          <AiOutlineArrowLeft />
          Go back home
        </Link>
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
