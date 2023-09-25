"use client"

import { Chessboard as ReactChessboard } from "react-chessboard"

export default function Chessboard() {
  return (
    <ReactChessboard
      customDarkSquareStyle={{
        backgroundColor: "hsl(173, 80.0%, 36.0%)",
      }}
      customLightSquareStyle={{
        backgroundColor: "hsl(163, 70.0%, 81.0%)",
      }}
      customDropSquareStyle={{
        boxShadow: "inset 0 0 1px 6px hsl(81, 80.0%, 66.0%)",
      }}
    />
  )
}
