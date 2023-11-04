import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function GameMenu() {
  return (
    <div>
      <Logo className="w-24 mb-8" />

      <div className="w-full flex flex-col gap-4">
        <span
          className="mb-4 font-semibold text-transparent text-lg"
          style={{
            background: "var(--gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Play with a friend
        </span>

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
        <span
          className="mb-4 font-semibold text-transparent text-lg"
          style={{
            background: "var(--gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Play with a bot
        </span>

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
  )
}
