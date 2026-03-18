"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@upnext/ui"
import { Rocket, Star, Bug, Zap, ChevronRight } from "lucide-react"

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight mb-12">Changelog</h1>

        <div className="space-y-12">
          {[
            {
              version: "v1.0.0",
              date: "March 18, 2026",
              title: "The Feature Bomb Launch",
              type: "Major",
              items: [
                { type: "feat", text: "Implemented the Money Layer with DCA and Bundles." },
                { type: "feat", text: "Added the Trust Layer with Oracle verification and Insurance." },
                { type: "feat", text: "Launched Social features including Investor Flex Cards and Tickers." },
                { type: "feat", text: "Gamification system with XP and Fantasy League." },
                { type: "feat", text: "Full suite of DeFi contracts on Polygon." },
              ]
            },
            {
              version: "v0.9.0",
              date: "March 1, 2026",
              title: "Beta Milestone",
              type: "Beta",
              items: [
                { type: "fix", text: "Fixed build path issues in monorepo." },
                { type: "feat", text: "Basic talent onboarding flow." },
                { type: "feat", text: "Investor dashboard foundations." },
              ]
            }
          ].map((release) => (
            <div key={release.version} className="relative pl-8 border-l border-border">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background" />
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-numbers font-bold text-text-primary">{release.version}</span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold border-accent/20 text-accent">{release.type}</Badge>
                  <span className="text-[10px] text-text-muted font-mono uppercase ml-auto">{release.date}</span>
                </div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight">{release.title}</h3>
              </div>
              <Card className="bg-surface border-border">
                <CardContent className="p-6 space-y-4">
                  {release.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <Badge className={cn(
                        "h-5 text-[8px] uppercase font-bold px-2",
                        item.type === "feat" ? "bg-green/10 text-green" : "bg-blue/10 text-blue"
                      )}>
                        {item.type}
                      </Badge>
                      <p className="text-sm text-text-secondary uppercase tracking-wider">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

import { cn } from "@/lib/utils"
