import Chessboard from "@/components/chessboard"
import Playerinfo from "@/components/playerinfo"

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="container max-w-xl flex flex-col ">
        <Playerinfo isActive />
        <Chessboard />
        <Playerinfo />
      </div>
    </div>
  )
}
