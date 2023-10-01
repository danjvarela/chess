import { headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"
import MobileChessboard from "./chessboard.mobile"
import BrowserChessboard from "./chessboard.browser"

export default function Chessboard({ unplayable }: { unplayable?: boolean }) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  )

  if (unplayable) {
    return (
      <div className="h-full w-full relative">
        <BrowserChessboard />
        <div className="absolute top-0 w-full h-full" />
      </div>
    )
  } else {
    return isMobile ? <MobileChessboard /> : <BrowserChessboard />
  }
}
