import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"

export default function Link({
  href,
  children,
  ...props
}: React.ComponentProps<typeof RadixLink>) {
  return (
    <NextLink href={href ?? ""} legacyBehavior passHref>
      <RadixLink href={href} {...props}>
        {children}
      </RadixLink>
    </NextLink>
  )
}
