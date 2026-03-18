"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Trophy, Zap, TrendingUp, Users, ArrowRight, Star } from "lucide-react"

export default function FantasyLeaguePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-gold text-black text-[10px] uppercase font-bold px-3 py-1">Season 4 Active</Badge>
              <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Ends in 14 Days</span>
            </div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Fantasy Talent League</h1>
            <p className="text-text-secondary font-body">Draft your dream portfolio with fantasy money and win real $UPN.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-gold/20 bg-gold hover:bg-gold/90 text-black border-none">
              <Zap className="w-4 h-4 fill-current" />
              Draft Portfolio
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-surface border-border">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                <CardTitle className="text-xl uppercase tracking-tight flex items-center gap-3">
                  <Star className="w-5 h-5 text-gold fill-current" />
                  Your Draft
                </CardTitle>
                <div className="text-right">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Remaining Budget</p>
                  <p className="text-2xl font-numbers font-bold text-text-primary">$4,250 <span className="text-sm text-text-muted">/ $10k</span></p>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-surface-raised rounded-xl border border-border group hover:border-gold/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface border border-border overflow-hidden" />
                        <div>
                          <p className="font-heading font-bold uppercase tracking-tight">Talent Name {i}</p>
                          <p className="text-[10px] text-text-muted uppercase tracking-widest">Growth: +14.2%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-numbers font-bold text-text-primary">$1,250</p>
                        <p className="text-[10px] text-green font-bold uppercase tracking-widest">+42 pts</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-8 rounded-xl border-2 border-dashed border-border text-text-muted hover:border-gold/50 hover:text-gold transition-all flex flex-col items-center justify-center gap-2">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Talent to Draft</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tight flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gold fill-current" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-text-muted font-bold w-4">0{i}</span>
                      <div className="w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center font-bold text-accent">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <p className="text-sm font-heading font-bold uppercase">User_{i}842</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">1,240 pts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-numbers font-bold text-gold">1,500 $UPN</p>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="w-full mt-4 text-text-muted uppercase tracking-widest text-[10px] font-bold">View Full Standings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Plus } from "lucide-react"
