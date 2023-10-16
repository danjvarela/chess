"use client"

import { isMobile } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"
import { Chessboard as ReactChessboard } from "react-chessboard"
import { sharedProps } from "./sharedProps"
import { DeviceSpecificChessboardProps } from "./types"

type Props = DeviceSpecificChessboardProps & {
  unplayable?: boolean
}

export default function Chessboard({ unplayable, mode = "vsFriend" }: Props) {
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
