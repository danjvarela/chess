import { Chessboard as ReactChessboard } from "react-chessboard"

export default function BaseChessboard({
  ...props
}: React.ComponentProps<typeof ReactChessboard>) {
  return (
    <ReactChessboard
      customBoardStyle={{borderRadius: 'var(--radius)'}}
      customDarkSquareStyle={{ backgroundColor: "#00d0aa" }}
      customLightSquareStyle={{ backgroundColor: "#d7fff8" }}
      {...props}
    />
  )
}
