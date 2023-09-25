import Logo from "./logo"

export default function Header() {
  return (
    <div className="container mx-auto p-4 max-w-screen-lg flex justify-center">
      <Logo className="w-[75px] md:w-[100px] lg:w-[128px]" />
    </div>
  )
}
