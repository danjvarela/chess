import ChessboardButton from "@/components/chessboard-button"
import Navigation from "@/components/navigation"
import cn from "@/utils/cn"

export default function Home() {
  return (
    <div
      className={cn(
        "w-full h-full pt-8 max-w-md mx-auto",
        "flex flex-col items-center px-4",
        "md:pt-32 md:max-w-xl md:px-0"
      )}
    >
      <Navigation />

      <div className="w-full flex flex-col items-center">
        <div
          className={cn(
            "w-full flex flex-col items-center mt-12 gap-8",
            "md:flex-row md:justify-between"
          )}
        >
          <div className="w-full max-w-xs">
            <div className="text-center font-bold mb-4">vs Computer</div>
            <ChessboardButton className="w-full aspect-square bg-sage-50" />
          </div>

          <div className="w-full max-w-xs md:max-w-xs">
            <div className="text-center font-bold mb-4">Play a Friend</div>
            <ChessboardButton className="w-full aspect-square bg-sage-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
