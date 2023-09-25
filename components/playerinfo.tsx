import cn from "@/utils/cn"

export type PlayerinfoProps = {
  isActive?: boolean
}

export default function Playerinfo({ isActive }: PlayerinfoProps) {
  return (
    <div className="w-full flex justify-between items-center my-4 bg-sagedark-3 p-2 rounded-lg text-lg">
      <span>Dan</span>
      <div
        className={cn(
          "bg-sagedark-9 rounded-lg py-2 px-4 text-tealdark-11 font-semibold",
          isActive && "text-tealdark-12"
        )}
      >
        12:34
      </div>
    </div>
  )
}
