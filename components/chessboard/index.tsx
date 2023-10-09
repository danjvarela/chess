"use client"

import { isMobile } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"
import { Chessboard as ReactChessboard } from "react-chessboard"
import { sharedProps } from "./sharedProps"
import { GameMode } from "./types"

export default function Chessboard({
  unplayable,
  mode = "vsFriend",
}: {
  unplayable?: boolean
  mode?: GameMode
}) {
  if (unplayable) {
    return (
      <ReactChessboard
        arePiecesDraggable={false}
        areArrowsAllowed={false}
        {...sharedProps}
      />
    )
  } else {
    return isMobile ? (
      <MobileChessboard mode={mode} />
    ) : (
      <BrowserChessboard mode={mode} />
    )
  }
}
