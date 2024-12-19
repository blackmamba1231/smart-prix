import React from "react"
import { cn } from "@/lib/utils"


export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-gray-300 bg-white p-3 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-900 dark:placeholder-gray-500 dark:focus:ring-blue-500",
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"
