"use client"

import { isMobile } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"
import { ChessboardProps } from "./types"

export default function Chessboard({
  mode = "vsFriend",
  id,
}: Pick<ChessboardProps, "mode" | "id">) {
  const chessboardProps: ChessboardProps = {
    id,
    mode,
  }

  return isMobile ? (
    <MobileChessboard {...chessboardProps} />
  ) : (
    <BrowserChessboard {...chessboardProps} />
  )
}
