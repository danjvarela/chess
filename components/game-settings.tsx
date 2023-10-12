"use client"

import { Button, Slider, TextField } from "@radix-ui/themes"
import { Color } from "chess.js"
import clamp from "lodash/clamp"
import { useState } from "react"
import { Dialog } from "@radix-ui/themes"
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting"

const MIN_ENGINE_DIFFICULTY = 2
const MAX_ENGINE_DIFFICULTY = 24

export default function GameSettings() {
  const [difficulty, setDifficulty] = useState(MIN_ENGINE_DIFFICULTY)
  const [playerColor, setPlayerColor] = useState<Color>("w")

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <AiOutlineSetting />
          Game Settings
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="!max-w-xs">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-col gap-4 w-full">
            <span>Difficulty</span>
            <div className="flex gap-4 items-center">
              <Slider
                value={[difficulty]}
                min={MIN_ENGINE_DIFFICULTY}
                max={MAX_ENGINE_DIFFICULTY}
                className="flex-1"
                onValueChange={(value) => {
                  setDifficulty(value[0])
                }}
              />
              <TextField.Root className="w-16">
                <TextField.Input
                  type="number"
                  value={difficulty}
                  onChange={(e) => {
                    const num = parseInt(e.target.value)
                    setDifficulty(
                      clamp(num, MIN_ENGINE_DIFFICULTY, MAX_ENGINE_DIFFICULTY)
                    )
                  }}
                  max={MAX_ENGINE_DIFFICULTY}
                  min={MIN_ENGINE_DIFFICULTY}
                />
              </TextField.Root>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <span>Play as</span>
            <div className="flex w-full gap-4">
              <Button
                className="flex-1"
                variant={playerColor === "w" ? "solid" : "outline"}
                onClick={() => setPlayerColor("w")}
              >
                White
              </Button>
              <Button
                className="flex-1"
                variant={playerColor === "b" ? "solid" : "outline"}
                onClick={() => setPlayerColor("b")}
              >
                Black
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full mt-4">
            <Button size="3">Start Game</Button>
            <Button size="3">New Game vs a Friend</Button>
            <Button size="3" color="gray" variant="soft">
              Abort Game
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
