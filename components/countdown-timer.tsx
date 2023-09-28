import cn from "@/utils/cn"
import { TimerResult } from "react-timer-hook"

export default function CountdownTimer({ timer }: { timer: TimerResult }) {
  const formatNumber = (num: Number) => num.toString().padStart(2, "0")
  return (
    <div
      className={cn(
        "bg-sagedark-9 rounded-lg py-2 px-4 text-tealdark-11 font-semibold",
        timer.isRunning && "text-tealdark-12"
      )}
    >
      {formatNumber(timer.minutes)} : {formatNumber(timer.seconds)}
    </div>
  )
}
