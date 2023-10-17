"use client"

import { isMobile } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"
import { ChessboardProps } from "./types"
import { useUpdateGame } from "@/hooks/games"
import { PENDING_PLAYER } from "@/utils/constants"
import { Color } from "chess.js"
import { useSession } from "next-auth/react"
import { useMemo } from "react"

export default function Chessboard({
  mode = "vsFriend",
  id,
}: Pick<ChessboardProps, "mode" | "id">) {

  // const playerColor: Color = useMemo(() => {
  //   const playerId = session?.data?.user?.id
  //
  //   if (gameData?.mode === "vsEngine") {
  //     return gameData?.whitePlayer === playerId ? "w" : "b"
  //   } else {
  //     if (gameData?.whitePlayer === playerId) return "w"
  //     if (gameData?.blackPlayer === playerId) return "b"
  //
  //     // logged in player is neither black nor white so we populate the pending player
  //     // with the logged in player's id
  //     if (gameData?.whitePlayer === PENDING_PLAYER) {
  //       updateGame({ whitePlayer: playerId })
  //       return "w"
  //     } else {
  //       updateGame({ blackPlayer: playerId })
  //       return "b"
  //     }
  //   }
  // }, [session, gameData])

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
