"use client"

import Chessboard from "@/components/chessboard"
import { Card } from "@radix-ui/themes"

export default function VsComputer() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8 px-2 gap-4">
      <div className="flex w-full justify-between max-w-[730px]">
        <Card size="1" className="w-full flex justify-center">
          <span className="font-bold text-xs md:text-base">Engine</span>
        </Card>
      </div>

      <div className="w-full max-w-[730px]">
        <Chessboard mode="vsEngine" />
      </div>

      <div className="flex w-full justify-between max-w-[730px]">
        <Card size="1" className="w-full flex justify-center">
          <span className="font-bold text-xs md:text-base">You</span>
        </Card>
      </div>
    </div>
  )
}
