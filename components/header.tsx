import Logo from "./logo"
import { Button } from "./ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-border w-full h-[72px] flex items-center fixed inset-0">
      <div className="container px-4 flex items-center">
        <Button variant="link" asChild>
          <Link href="/">
            <Logo className="w-24" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
