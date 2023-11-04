"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Chessboard } from "react-chessboard"

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="aspect-square h-[90%] mx-auto relative">
        <Chessboard />

        <div className="absolute top-0 -left-[300px] w-[300px] p-4 pr-8">
          <div className="w-full flex flex-col gap-4">
            <span className="mb-4 font-semibold">Play with a friend</span>

            <span className="text-muted-foreground text-sm leading-snug">
              To play with a friend, you first need to create an account.
            </span>

            <div className="flex flex-col gap-2">
              <Button>Continue with Google</Button>
              <Button>Continue with Facebook</Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="w-full flex flex-col gap-4">
            <span className="mb-4 font-semibold">Play with a bot</span>

            <div className="flex flex-col gap-4">
              <Label>Difficulty</Label>
              <div className="flex gap-4">
                <Slider />
                <Input className="w-24" type="number" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <Label>Play as</Label>
              <div className="flex gap-4">
                <Button className="flex-1" variant="secondary">
                  White
                </Button>
                <Button className="flex-1" variant="outline">
                  Black
                </Button>
              </div>
            </div>

            <Button>Start Game</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
