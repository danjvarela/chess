import { headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"

export default function Chessboard() {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  )

  return isMobile ? <MobileChessboard /> : <BrowserChessboard />
}
