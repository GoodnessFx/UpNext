"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { TrendingUp, Clock, ShieldCheck, ArrowRight, Zap, Target, BarChart3 } from "lucide-react"

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Prediction Markets</h1>
            <p className="text-text-secondary font-body max-w-2xl">Bet on talent milestones and outcomes. All markets are resolved on-chain via verified data oracles.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-accent/20">
              <BarChart3 className="w-4 h-4" />
              Your Bets
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { q: "Will Chioma hit 1M Spotify streams by June?", pot: "$12,400", ends: "12d" },
            { q: "Will Femi join a Premier League club this season?", pot: "$45,000", ends: "45d" },
            { q: "Will Jade's next NFT drop sell out in < 1h?", pot: "$8,200", ends: "2d" },
          ].map((market, i) => (
            <Card key={i} className="bg-surface group hover:border-accent transition-all border-border">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold border-accent/20 text-accent">Active Market</Badge>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">{market.ends} left</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-heading font-bold uppercase leading-tight group-hover:text-accent transition-colors">{market.q}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center py-4 border-y border-border">
                  <div>
                    <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">Total Pool</p>
                    <p className="text-xl font-numbers font-bold text-text-primary">{market.pot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">Currency</p>
                    <p className="text-xl font-heading font-bold text-green">USDT</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-12 bg-green/10 hover:bg-green text-green hover:text-white border-green/20 uppercase tracking-widest text-[10px] font-bold">Yes</Button>
                  <Button className="h-12 bg-red/10 hover:bg-red text-red hover:text-white border-red/20 uppercase tracking-widest text-[10px] font-bold">No</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
