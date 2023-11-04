import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import Logo from "./logo"

function Title({ title }: { title: string }) {
  return (
    <span
      className="mb-4 font-semibold text-transparent text-lg"
      style={{
        background: "var(--gradient)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      {title}
    </span>
  )
}

export default function GameMenu() {
  return (
    <>
      <div className="w-32 mb-8">
        <Logo />
      </div>

      <div className="w-full flex flex-col gap-4">
        <Title title="Play with a friend" />

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
        <Title title="Play with a bot" />

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
    </>
  )
}
