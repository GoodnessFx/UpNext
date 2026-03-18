"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { TrendingUp, Clock, ShieldCheck, ArrowRight, Zap, Target } from "lucide-react"

export default function FuturesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Talent Futures</h1>
            <p className="text-text-secondary font-body max-w-2xl">Commit capital before a campaign launches to secure a 10% discount. Help talents gauge demand and kickstart their journey.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-accent/20">
              <Zap className="w-4 h-4" />
              Pre-Commit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-surface group hover:border-accent transition-all cursor-pointer overflow-hidden border-border">
              <div className="aspect-[16/9] bg-surface-raised relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-accent text-white border-none">10% DISCOUNT</Badge>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <Badge className="bg-black/40 backdrop-blur-md border-white/10 uppercase font-bold text-[10px]">Launching in 4d</Badge>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold uppercase mb-2">Future Star {i}</h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Demand Signal</span>
                  <span className="text-sm font-numbers font-bold text-accent">$12,450 Committed</span>
                </div>
                <div className="space-y-4">
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: '65%' }} />
                  </div>
                  <Button className="w-full h-12 uppercase tracking-widest text-[10px] font-bold">Secure Discount</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
