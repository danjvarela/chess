import Playerinfo from "@/components/playerinfo"
import Chessboard from "@/components/chessboard"

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="container max-w-xl flex flex-col ">
        <Playerinfo isActive />
        <Chessboard />
        <Playerinfo />
      </div>
    </div>
  )
}
