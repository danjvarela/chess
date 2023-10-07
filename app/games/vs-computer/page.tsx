"use client"

import Chessboard from "@/components/chessboard"

export default function VsComputer() {
  return (
    <div className="w-[700px] h-full flex justify-center items-center">
      <Chessboard mode="vsEngine" />
    </div>
  )
}
