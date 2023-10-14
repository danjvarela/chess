import cn from "@/utils/cn"
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters"

export default function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof AiOutlineLoading3Quarters>) {
  return (
    <AiOutlineLoading3Quarters
      className={cn("animate-spin w-8 h-8", className)}
      {...props}
    />
  )
}
