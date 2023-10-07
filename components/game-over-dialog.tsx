"use client"

import { Button, Dialog } from "@radix-ui/themes"
import { Chess } from "chess.js"
import { useState } from "react"

export default function GameOverDialog({ game }: { game?: Chess }) {
  const [open, setOpen] = useState(true)

  if (!game) return null

  const title = (() => {
    if (game.isDraw()) return "Draw"
    if (game.turn() === "w") return "Black won"
    if (game.turn() === "b") return "White won"
  })()

  const description = (() => {
    if (game.isInsufficientMaterial()) return "due to insufficient material"
    if (game.isCheckmate()) return "due to checkmate"
    if (game.isStalemate()) return "due to stalemate"
  })()

  return (
    <Dialog.Root open={game.isGameOver() && open}>
      <Dialog.Content className="!max-w-[300px]">
        <Dialog.Title className="text-center">{title}</Dialog.Title>
        <Dialog.Description className="text-center">
          {description}
        </Dialog.Description>
        <div className="flex flex-col w-full items-center gap-4 mt-12">
          <Dialog.Close>
            <Button className="w-full" size="3">
              New Game vs a Friend
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button className="w-full" size="3">
              New Game vs Engine
            </Button>
          </Dialog.Close>
          <Dialog.Close onClick={() => setOpen(false)}>
            <Button className="w-full" size="3" variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
