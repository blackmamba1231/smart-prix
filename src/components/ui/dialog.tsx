"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils"; // Utility function for conditional class names

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 transition-opacity" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg outline-none focus-visible:ring focus-visible:ring-opacity-75",
          "dark:bg-gray-800 dark:text-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </div>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 text-lg font-medium text-gray-900 dark:text-gray-100", className)} {...props} />
);

export const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-xl font-bold text-gray-900 dark:text-gray-100", className)} {...props} />
);

export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)} {...props} />
);
