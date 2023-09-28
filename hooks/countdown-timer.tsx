import CountdownTimerComponent from "@/components/countdown-timer"
import { TimerSettings, useTimer } from "react-timer-hook"

type CustomTimerSettings = Omit<TimerSettings, "expiryTimestamp"> & {
  expireAfterMinutes: 1 | 2 | 3 | 5 | 10 | 15 | 30
}

const MINUTES = 60

export const useCountdownTimer = ({
  expireAfterMinutes,
  ...timerSettings
}: CustomTimerSettings) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + expireAfterMinutes * MINUTES)

  const timer = useTimer({ expiryTimestamp: time, ...timerSettings })

  return {
    CountdownTimer: () => <CountdownTimerComponent timer={timer} />,
    timer,
  }
}
