"use client"

import React, { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "@upnext/ui"
import { TrendingUp, TrendingDown, ArrowUpRight, Search, LayoutGrid, List, ChevronRight, BarChart3 } from "lucide-react"

export default function SecondaryMarketPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: "24h Volume", value: "$4.2M", change: "+12%", icon: TrendingUp, trend: "up" },
            { label: "Total Listings", value: "8,450", change: "+46%", icon: BarChart3, trend: "up" },
            { label: "Avg. Price", value: "$167", change: "-8%", icon: TrendingDown, trend: "down" },
            { label: "Market Cap", value: "$142M", change: "+5%", icon: ArrowUpRight, trend: "up" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-surface p-6 hover:bg-surface-raised transition-colors border-border">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant={stat.trend === "up" ? "success" : "danger"} className={cn(
                  "text-[10px] uppercase font-bold px-2 py-0.5",
                  stat.trend === "up" ? "bg-green/15 text-green" : "bg-red/15 text-red"
                )}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <p className="text-3xl font-numbers font-bold text-text-primary">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Market Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 border-b border-border pb-8">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            <Input 
              className="pl-10 h-12 bg-surface border-border focus:border-accent" 
              placeholder="Search talent shares, symbols, or sellers..." 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="h-12 px-8 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent">
              <Link href="/secondary">List Shares</Link>
            </Button>
            <div className="flex items-center gap-2 bg-surface-raised p-1 rounded-lg border border-border">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "text-accent bg-accent/5" : "text-text-muted"}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "text-accent bg-accent/5" : "text-text-muted"}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Order Book / Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12">
            <Card className="bg-surface overflow-hidden border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-raised border-b border-border">
                    <tr>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Talent</th>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Price per Share</th>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Quantity</th>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Total Value</th>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Change (24h)</th>
                      <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <tr key={i} className="hover:bg-surface-raised transition-colors cursor-pointer group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-card bg-surface-raised border border-border overflow-hidden" />
                            <div>
                              <p className="font-heading font-bold text-text-primary uppercase tracking-tight">Chioma Music</p>
                              <p className="text-[10px] text-text-muted uppercase tracking-widest">CHIOMA.MUS</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-numbers font-bold text-text-primary">$1.24</td>
                        <td className="px-8 py-6 font-numbers font-bold text-text-primary">1,000</td>
                        <td className="px-8 py-6 font-numbers font-bold text-text-primary">$1,240.00</td>
                        <td className="px-8 py-6 font-numbers font-bold text-green">+14.2%</td>
                        <td className="px-8 py-6 text-right">
                          <Button size="sm" className="bg-accent text-white uppercase tracking-widest text-[10px] font-bold group-hover:scale-105 transition-transform">Buy Now</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

import { cn } from "@/lib/utils"
