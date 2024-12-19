// components/ui/modal.tsx
"use client"

import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-[90%] max-w-md",
          "transform transition-transform duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>}
        <div className="mt-4">{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
