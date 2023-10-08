import {
  MAX_ENGINE_DIFFICULTY,
  MIN_ENGINE_DIFFICULTY,
  useEngineDifficulty,
} from "@/hooks/engine-game"
import { Button, Slider, TextField } from "@radix-ui/themes"
import clamp from "lodash/clamp"

export default function GameSettings() {
  const { difficulty, setDifficulty } = useEngineDifficulty()
  const { playerColor, setPlayerColor } = useEnginePlayerColor()

  return (
    <>
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
          <Button className="flex-1">White</Button>
          <Button className="flex-1" variant="outline">
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
    </>
  )
}
