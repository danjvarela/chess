"use client"

import Chessboard from "@/components/chessboard"
import GameSettings from "@/components/dialogs/game-settings"
import Link from "@/components/ui/link"
import cn from "@/utils/cn"
import { Card, Button } from "@radix-ui/themes"
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft"
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting"

type Props = {
  params: {
    id: string
  }
}

export default function GamePage({ params }: Props) {
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center px-2 gap-4",
        "md:max-w-2xl md:px-8 mx-auto"
      )}
    >
      <div className="flex justify-between w-full items-center">
        <Link
          color="gray"
          href="/"
          className="flex items-center gap-2"
          size="2"
        >
          <AiOutlineArrowLeft />
          Go back home
        </Link>
        <GameSettings
          trigger={
            <Button>
              <AiOutlineSetting />
              Game Settings
            </Button>
          }
        />
      </div>

      <Card size="1" className="w-full flex justify-center">
        <span className="font-bold text-xs md:text-base">Computer</span>
      </Card>

      <div className="w-full aspect-square bg-sage-50">
        <Chessboard mode="vsEngine" id={params.id} />
      </div>

      <Card size="1" className="w-full flex justify-center">
        <span className="font-bold text-xs md:text-base">You</span>
      </Card>
    </div>
  )
}
