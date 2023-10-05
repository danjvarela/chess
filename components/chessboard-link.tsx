import { Card } from "@radix-ui/themes"
import Chessboard from "./chessboard"
import Link from "next/link"

export default function ChessboardLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Card asChild>
      <Link className={className} {...props}>
        <Chessboard unplayable />
      </Link>
    </Card>
  )
}
