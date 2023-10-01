import { Chessboard } from "react-chessboard"

export const kingCheckedStyle = {
  background: "hsla(348, 99.7%, 38.2%, 0.428)",
}

export const possibleMoveStyle = {
  background:
    "radial-gradient(circle, hsla(140, 91.7%, 3.6%, 0.177) 25%, transparent 25%)",
}

export const moveFromSquareStyle = {
  background: "hsla(53, 99.8%, 48.2%, 0.314)",
}

export const sharedProps: React.ComponentProps<typeof Chessboard> = {
  customDarkSquareStyle: {
    backgroundColor: "hsl(173, 80.0%, 36.0%)",
  },
  customLightSquareStyle: {
    backgroundColor: "hsl(163, 70.0%, 81.0%)",
  },
  customDropSquareStyle: {
    boxShadow: "inset 0 0 1px 6px hsl(81, 80.0%, 66.0%)",
  },
}
