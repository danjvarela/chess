'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import GameMenu from "../game-menu"
import { Settings } from "lucide-react"

export default function GameMenuDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <GameMenu />
      </DialogContent>
    </Dialog>
  )
}
