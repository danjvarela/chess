import Image from "next/image"
import logo from "./logo.svg"

export default function Logo(
  props: Omit<React.ComponentProps<typeof Image>, "src" | "alt">
) {
  return <Image src={logo} alt="logo" {...props} />
}
