import ChessboardLink from "@/components/chessboard-link"

export default function Home() {
  return (
    <div className="w-full h-full pt-8 md:pt-32">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row mt-12 gap-8">
          <div className="w-[300px]">
            <div className="text-center font-bold mb-4">vs Computer</div>
            <ChessboardLink
              className="w-full h-[300px]"
              href="/games/vs-computer"
            />
          </div>

          <div className="w-[300px]">
            <div className="text-center font-bold mb-4">Play a Friend</div>
            <ChessboardLink className="w-full h-[300px]" href="#" />
          </div>
        </div>
      </div>
    </div>
  )
}
