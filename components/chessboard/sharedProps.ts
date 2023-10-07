import { Chessboard } from "react-chessboard"

export const kingCheckedStyle = {
  background: "hsla(348, 99.7%, 38.2%, 0.428)",
}

export const possibleMoveStyle = {
  background:
    "radial-gradient(circle, hsla(150, 93.2%, 3.0%, 0.279) 25%, transparent 25%)",
}

export const moveFromSquareStyle = {
  background: "hsla(53, 99.8%, 48.2%, 0.314)",
}

export const sharedProps: React.ComponentProps<typeof Chessboard> = {
  customDarkSquareStyle: {
    backgroundColor: "var(--jade-9)",
  },
  customLightSquareStyle: {
    backgroundColor: "var(--jade-12)",
  },
  customDropSquareStyle: {
    boxShadow: "inset 0 0 1px 6px hsl(81, 80.0%, 66.0%)",
  },
}
