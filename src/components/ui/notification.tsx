// components/ui/notification.tsx
"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NotificationProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose: () => void
}

export function Notification({ message, type = "info", duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 p-4 text-white rounded-lg shadow-md transition-opacity",
        typeClasses[type]
      )}
    >
      {message}
    </div>
  )
}
