import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#f9d3c4] dark:bg-[#b54c2f]/20 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
