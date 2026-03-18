"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@upnext/ui"
import { Badge } from "@upnext/ui"
import { TrendingUp, Users, Target, Rocket, Clock, MessageCircle } from "lucide-react"

interface Factor {
  label: string
  score: number
  desc: string
  icon: any
}

const factors: Factor[] = [
  { label: "Social Growth Velocity", score: 92, desc: "Followers + engagement trending up significantly.", icon: Users },
  { label: "Content Quality", score: 88, desc: "ML analysis of audio/visual production value.", icon: Rocket },
  { label: "Market Timing", score: 95, desc: "Genre/sport currently trending globally.", icon: Target },
  { label: "Competitive Landscape", score: 82, desc: "Low saturation in this specific niche.", icon: MessageCircle },
  { label: "Earnings Consistency", score: 78, desc: "Stable income history for past 6 months.", icon: TrendingUp },
]

export function StarScoreBreakdown() {
  return (
    <Card className="bg-surface-raised border-accent/20">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-lg font-heading font-bold uppercase tracking-widest text-accent">AI Star Score Breakdown</CardTitle>
          <Badge variant="default" className="text-lg font-numbers font-bold px-4 py-1">⭐ 94/100</Badge>
        </div>
        <p className="text-xs text-text-secondary font-body">Our model analyzes 140+ data points to predict career trajectory.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {factors.map((f) => (
          <div key={f.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <f.icon className="w-4 h-4 text-text-muted" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-primary">{f.label}</span>
              </div>
              <span className="font-numbers font-bold text-sm">{f.score}/100</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${f.score}%` }} />
            </div>
            <p className="text-[10px] text-text-muted font-body leading-relaxed">{f.desc}</p>
          </div>
        ))}
        
        <div className="pt-6 border-t border-border mt-6">
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-border" />
              <p className="text-xs text-text-secondary font-ui uppercase tracking-wider">Compared to: <span className="text-text-primary font-bold">Femi.SPT</span></p>
            </div>
            <p className="text-[10px] text-text-muted font-body italic leading-relaxed">
              "Chioma's growth pattern mirrors Femi.SPT exactly before he signed his $5M endorsement deal."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
