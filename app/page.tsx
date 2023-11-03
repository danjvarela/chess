"use client"

import { Chessboard } from "react-chessboard"

export default function Home() {
  return (
    <div className="container mx-auto h-screen pt-[72px] flex items-center">
      <div className="aspect-square h-[90%] mx-auto">
        <Chessboard />
      </div>
    </div>
  )
}
