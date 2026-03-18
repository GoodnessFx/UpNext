"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Users, Plus, MessageCircle, TrendingUp, Shield, ArrowRight } from "lucide-react"

export default function InvestmentClubsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2 uppercase tracking-tight">Investment Clubs</h1>
            <p className="text-text-secondary font-body">Pool money with friends, vote on picks, and share returns.</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="gap-2 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent h-12 px-8">
              <Link href="/clubs">Join with Code</Link>
            </Button>
            <Button asChild className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-accent/20">
              <Link href="/clubs">
                <Plus className="w-4 h-4" />
                Create Club
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Lagos Alpha", members: 12, portfolio: "$42,000", roi: "+145%", icon: "LA" },
            { name: "Gen Z Sharks", members: 84, portfolio: "$128,000", roi: "+210%", icon: "GZ" },
            { name: "Music Mavens", members: 24, portfolio: "$65,000", roi: "+86%", icon: "MM" },
          ].map((club) => (
            <Card key={club.name} className="bg-surface group hover:border-accent transition-all cursor-pointer overflow-hidden border-border">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-alt flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg">
                    {club.icon}
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold border-accent/20 text-accent">Active</Badge>
                </div>
                <CardTitle className="text-2xl font-heading font-bold uppercase tracking-tight group-hover:text-accent transition-colors">{club.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-surface-raised rounded-lg border border-border">
                    <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">Portfolio</p>
                    <p className="text-lg font-numbers font-bold text-text-primary">{club.portfolio}</p>
                  </div>
                  <div className="p-3 bg-surface-raised rounded-lg border border-border">
                    <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">All-time ROI</p>
                    <p className="text-lg font-numbers font-bold text-green">{club.roi}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-4 border-y border-border">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-surface-raised flex items-center justify-center text-[10px] font-bold text-accent">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-accent text-white flex items-center justify-center text-[10px] font-bold">
                      +{club.members - 4}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">12 Active</span>
                  </div>
                </div>

                <Button className="w-full h-12 uppercase tracking-widest text-[10px] font-bold group">
                  Enter Club House
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
