"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Bell, Wallet, TrendingUp, Award, MessageSquare, ChevronRight, Check, Zap } from "lucide-react"
import { useRealTimeData } from "@/lib/sim-data"

export default function NotificationsPage() {
  const { isSyncing } = useRealTimeData({}, 5000)

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Notifications</h1>
            {isSyncing && <Zap className="w-4 h-4 text-accent animate-pulse" />}
          </div>
          <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-widest gap-2" onClick={() => alert("Marked all as read")}>
            <Check className="w-4 h-4" />
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { type: "payout", title: "Dividend Received", desc: "You received $12.40 from Chioma Music.", time: "2m ago", icon: Wallet, color: "text-green" },
            { type: "milestone", title: "Milestone Reached", desc: "Chioma Music just hit 1M streams on Spotify!", time: "1h ago", icon: TrendingUp, color: "text-accent" },
            { type: "reward", title: "XP Earned", desc: "You earned 500 XP for your 7-day investment streak.", time: "3h ago", icon: Award, color: "text-gold" },
            { type: "social", title: "New Update", desc: "Chioma Music posted a new studio session video.", time: "1d ago", icon: MessageSquare, color: "text-accent-alt" },
          ].map((n, i) => (
            <Card key={i} className="bg-surface border-border group hover:border-accent/30 transition-all cursor-pointer">
              <CardContent className="p-6 flex items-center gap-6">
                <div className={cn("w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center shrink-0", n.color)}>
                  <n.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-heading font-bold uppercase text-sm">{n.title}</h4>
                    <span className="text-[10px] text-text-muted font-mono uppercase">{n.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">{n.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

import { cn } from "@/lib/utils"
