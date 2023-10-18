"use client"

import { Button, Slider, TextField } from "@radix-ui/themes"
import { Color } from "chess.js"
import clamp from "lodash/clamp"
import { useEffect, useState } from "react"
import { Dialog } from "@radix-ui/themes"
import { useSession } from "next-auth/react"
import { useCreateGame } from "@/hooks/games"
import { Game } from "@/types/games"
import {
  DEFAULT_FEN,
  ENGINE_PLAYER,
  PENDING_PLAYER,
  MIN_ENGINE_DIFFICULTY,
  MAX_ENGINE_DIFFICULTY,
} from "@/utils/constants"
import { GameMode } from "@/types/games"
import { useRouter } from "next/navigation"
import Spinner from "../ui/spinner"

type Props = {
  trigger: JSX.Element
  mode?: GameMode
  context?: "beforeGame"
}

const testData: Game = {
  whitePlayer: "Alice",
  blackPlayer: "Bob",
  whiteRemainingTime: 600, // in seconds
  blackRemainingTime: 600, // in seconds
  engineDifficulty: 3, // optional
  gameStarted: false,
  gameOver: false,
  mode: "vsFriend",
  timeLimit: 900, // in seconds
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", // example FEN string
}

export default function GameSettings({ trigger, context, mode }: Props) {
  const router = useRouter()
  const [difficulty, setDifficulty] = useState(MIN_ENGINE_DIFFICULTY)
  const [playerColor, setPlayerColor] = useState<Color>("w")
  const session = useSession()
  const user = session?.data?.user
  const {
    mutate: createGame,
    data: createdGameRef,
    isLoading: gameCreationInProgress,
  } = useCreateGame()

  const handleCreateGame = (mode?: GameMode) => {
    if (!user || !mode) return

    const opponentPlayer = mode === "vsEngine" ? ENGINE_PLAYER : PENDING_PLAYER

    createGame({
      fen: DEFAULT_FEN,
      whitePlayer: playerColor === "w" ? user.id : opponentPlayer,
      blackPlayer: playerColor === "b" ? user.id : opponentPlayer,
      mode,
      timeLimit: 20,
      engineDifficulty: mode === "vsEngine" ? difficulty : undefined,
    })
  }

  useEffect(() => {
    if (createdGameRef?.id) router.push(`/games/${createdGameRef.id}`)
  }, [createdGameRef, router])

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
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
            <Button
              size="3"
              disabled={gameCreationInProgress}
              onClick={() => handleCreateGame(mode)}
            >
              {gameCreationInProgress && <Spinner className="w-4 h-4" />}
              Start Game
            </Button>
            {context === "beforeGame" ? (
              <Dialog.Close>
                <Button size="3" color="gray" variant="soft">
                  Close
                </Button>
              </Dialog.Close>
            ) : (
              <>
                <Button size="3">New Game vs a Friend</Button>
                <Button size="3" color="gray" variant="soft">
                  Abort Game
                </Button>
              </>
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
