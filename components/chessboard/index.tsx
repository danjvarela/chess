"use client"

import { isMobile } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"
import { Chessboard as ReactChessboard } from "react-chessboard"
import { sharedProps } from "./sharedProps"
import { useIsClient } from "usehooks-ts"
import Loading from "@/app/loading"
import { GameMode } from "./types"

export default function Chessboard({
  unplayable,
  mode = "vsFriend",
}: {
  unplayable?: boolean
  mode?: GameMode
}) {
  const isClient = useIsClient()

  if (unplayable) {
    return isClient ? (
      <ReactChessboard
        arePiecesDraggable={false}
        areArrowsAllowed={false}
        {...sharedProps}
      />
    ) : (
      <Loading />
    )
  } else {
    return isMobile ? (
      <MobileChessboard mode={mode} />
    ) : (
      <BrowserChessboard mode={mode} />
    )
  }
}
