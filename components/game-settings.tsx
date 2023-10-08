import { Button, Slider, TextField } from "@radix-ui/themes"

export default function GameSettings() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <span>Difficulty</span>
        <div className="flex gap-4 items-center">
          <Slider defaultValue={[40]} max={100} className="flex-1" />
          <TextField.Root className="w-16">
            <TextField.Input type="number" max={100} min={0} />
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
