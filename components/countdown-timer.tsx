import { TimerResult } from "react-timer-hook"

export default function CountdownTimer({ timer }: { timer: TimerResult }) {
  const formatNumber = (num: Number) => num.toString().padStart(2, "0")
  return (
    <div>
      {formatNumber(timer.minutes)} : {formatNumber(timer.seconds)}
    </div>
  )
}
