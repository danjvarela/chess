import { Card } from "@radix-ui/themes"
import Chessboard from "./chessboard"

export default function ChessboardButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Card asChild>
      <button className={className} {...props}>
        <Chessboard unplayable />
      </button>
    </Card>
  )
}
