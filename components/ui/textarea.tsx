import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-w-0 rounded-md border border-gray-200 dark:border-gray-800 bg-[#f9f9f9] dark:bg-[#1e1e1e] px-3 py-2 text-base text-black dark:text-white placeholder:opacity-0 focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
