"use client"

import React from "react"
import { Button } from "@upnext/ui"
import Link from "next/link"

import { 
  Search, 
  Trophy, 
  BarChart3, 
  Coins, 
  Rocket, 
  Zap, 
  Bell, 
  User, 
  Menu,
  LayoutDashboard
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@upnext/ui"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-text-primary tracking-tight">
          UP<span className="text-accent">NEXT</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/discover" className="flex items-center gap-2 text-[10px] font-heading font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
            <Search className="w-3.5 h-3.5" />
            Discovery
          </Link>
          <Link href="/secondary" className="flex items-center gap-2 text-[10px] font-heading font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
            <BarChart3 className="w-3.5 h-3.5" />
            Market
          </Link>
          <Link href="/clubs" className="flex items-center gap-2 text-[10px] font-heading font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            Clubs
          </Link>
          <Link href="/fantasy" className="flex items-center gap-2 text-[10px] font-heading font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Fantasy
          </Link>
          <Link href="/token" className="flex items-center gap-2 text-[10px] font-heading font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
            <Coins className="w-3.5 h-3.5" />
            $UPN
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/notifications" className="p-2 text-text-muted hover:text-accent transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 h-10 w-10 rounded-full bg-surface-raised border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-accent font-bold">T</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-surface border-border p-2">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-text-muted px-2 py-1.5">Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/investor" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-tight">Investor Dash</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/talent" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">
                  <Rocket className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-tight">Talent Dash</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border my-1" />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-tight">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-red/10 hover:text-red transition-colors cursor-pointer text-red">
                <span className="text-xs font-bold uppercase tracking-tight">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
