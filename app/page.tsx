import { BaseChessboard } from "@/components/chessboard"
import GameMenuDialog from "@/components/dialogs/game-menu"
import GameMenu from "@/components/game-menu"

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center px-4 relative">
      <div className="absolute h-fit inset-0 w-full flex items-center justify-end p-2 xs:hidden">
        <GameMenuDialog />
      </div>

      <div className="flex justify-center gap-8 w-full">
        <div className="w-full max-w-2xl relative flex">
          <BaseChessboard />

          <div className="flex-1 hidden xs:block lg:hidden mx-2">
            <GameMenuDialog />
          </div>
        </div>

        <div className="hidden lg:block flex-1 max-w-[250px]">
          <GameMenu />
        </div>
      </div>
    </div>
  )
}
