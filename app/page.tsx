import GameSettings from "@/components/dialogs/game-settings"
import Navigation from "@/components/navigation"
import cn from "@/utils/cn"
import { Button } from "@radix-ui/themes"

export default function Home() {
  return (
    <div
      className={cn(
        "w-full h-full pt-32 max-w-md mx-auto",
        "flex flex-col items-center px-4 gap-8",
        "md:max-w-xl md:px-0"
      )}
    >
      <Navigation />

      <div className="w-full max-w-xs flex flex-col items-center gap-4">
        <GameSettings
          trigger={
            <Button className="w-full" size="3">
              vs Computer
            </Button>
          }
          context="beforeGame"
          mode="vsEngine"
        />
        <GameSettings
          trigger={
            <Button className="w-full" size="3">
              vs a Friend
            </Button>
          }
          context="beforeGame"
          mode="vsFriend"
        />
      </div>
    </div>
  )
}
