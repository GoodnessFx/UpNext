"use client"

import React from "react"
import { Badge } from "@upnext/ui"
import { cn } from "@upnext/ui"

interface StarScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function StarScore({ score, size = "md" }: StarScoreProps) {
  const getVariant = (s: number) => {
    if (s >= 85) return "default" // violet/accent
    if (s >= 70) return "success" // green
    if (s >= 50) return "warning" // gold
    return "danger" // red
  }

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  return (
    <Badge 
      variant={getVariant(score)} 
      className={cn("font-bold font-numbers tracking-tight uppercase", sizes[size])}
    >
      ⭐ {score}/100
    </Badge>
  )
}
