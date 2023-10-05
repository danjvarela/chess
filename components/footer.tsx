import cn from "@/utils/cn"
import { Link, Separator } from "@radix-ui/themes"

export default function Footer() {
  return (
    <div className="mt-auto pt-24 pb-4 px-3">
      <div
        className={cn(
          "text-sm text-sage-900 flex flex-col items-center justify-center w-full h-fit",
          "gap-1 text-center"
        )}
      >
        <Separator orientation="horizontal" size="4" className="mb-2" />
        <span className="flex gap-2">
          <Link href="https://github.com/danjvarela/chess" target="_blank">
            Source Code
          </Link>
          |
          <span className="whitespace-break-spaces">
            Created by{" "}
            <Link href="https://danvarela.com" target="_blank">
              danvarela.com
            </Link>
          </span>
        </span>
        <div>Made using Radix UI, Next.js, Typescript and Tailwindcss</div>
      </div>
    </div>
  )
}
