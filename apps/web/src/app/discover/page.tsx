"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Search, MapPin, TrendingUp, Users, ChevronRight, LayoutGrid, List } from "lucide-react"
import { StarScore } from "@/components/star-score"

import Link from "next/link"

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            <Input 
              className="pl-10 h-14 bg-surface border-border focus:border-accent text-lg" 
              placeholder="Search by name, category, or city..." 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-14 px-8 uppercase tracking-widest text-[10px] font-bold">Filters</Button>
            <div className="flex items-center gap-2 bg-surface-raised p-1 rounded-lg border border-border">
              <Button variant="ghost" size="icon" className="text-accent bg-accent/5"><LayoutGrid className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="text-text-muted"><List className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link key={i} href="/talent/chioma-music">
              <Card className="bg-surface group hover:border-accent transition-all cursor-pointer overflow-hidden border-border">
                <div className="aspect-[16/9] bg-surface-raised relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-black/40 backdrop-blur-md border-white/10 uppercase font-bold text-[10px] px-3">Music</Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <StarScore score={90 + i} size="sm" />
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold uppercase tracking-tight group-hover:text-accent transition-colors">Talent Name {i}</h3>
                      <div className="flex items-center gap-2 text-text-muted mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Lagos, NG</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">Raised</p>
                        <p className="text-lg font-numbers font-bold text-text-primary">$14,500 <span className="text-xs text-text-muted">/ $20k</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold mb-1">Backers</p>
                        <p className="text-lg font-numbers font-bold text-text-primary">87</p>
                      </div>
                    </div>
                    
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '72.5%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green" />
                        <span className="text-[10px] font-bold text-green uppercase tracking-widest">+124% ROI</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest gap-1 p-0 h-auto hover:bg-transparent hover:text-accent">
                        <Link href="/talent/chioma-music">
                          Invest <ChevronRight className="w-3 h-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
