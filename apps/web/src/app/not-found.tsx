"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@upnext/ui"
import { Search, Home, ArrowLeft } from "lucide-react"
import Link from "next/navigation"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative inline-block">
          <h1 className="text-[12rem] font-heading font-bold text-accent/10 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-accent/20 blur-3xl animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">Talent Not Found</h2>
          <p className="text-text-secondary font-body">The page you're looking for doesn't exist or has been moved to a different orbit.</p>
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          <Button asChild className="h-14 uppercase tracking-widest text-[10px] font-bold gap-2">
            <a href="/">
              <Home className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
          <Button variant="outline" asChild className="h-14 uppercase tracking-widest text-[10px] font-bold gap-2 border-accent/20 text-accent">
            <a href="/discover">
              <Search className="w-4 h-4" />
              Explore Discovery
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
