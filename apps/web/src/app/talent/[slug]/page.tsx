"use client"

import React, { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@upnext/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@upnext/ui"
import { Input } from "@upnext/ui"
import { Label } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { StarScore } from "@/components/star-score"
import { Badge } from "@upnext/ui"
import { 
  Play, 
  MapPin, 
  Users, 
  Clock, 
  Share2, 
  MessageCircle, 
  Star, 
  LineChart, 
  ChevronRight,
  TrendingUp,
  DollarSign
} from "lucide-react"

import { VerifiedBadge } from "@/components/verified-badge"
import { LiveTicker } from "@/components/ticker"
import { ShieldCheck, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CampaignPage() {
  const [amount, setAmount] = useState<string>("100")
  const [showAutoInvest, setShowAutoInvest] = useState(false)

  const calculateReturns = (val: string) => {
    const num = parseFloat(val) || 0
    return {
      equity: (num / 20000) * 100, // mock target 20k
      low: num * 2.4,
      mid: num * 6.5,
      high: num * 21,
      breakEven: "18 months"
    }
  }

  const returns = calculateReturns(amount)

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="h-[40vh] relative overflow-hidden bg-surface-raised border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-12 relative z-20">
            <div className="flex flex-col md:flex-row items-end gap-8 w-full">
              <div className="w-40 h-40 rounded-card bg-surface border-4 border-background overflow-hidden shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-accent to-accent-alt" />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <h1 className="text-4xl md:text-5xl font-heading font-bold flex items-center gap-3">
                    Chioma Music
                    <VerifiedBadge />
                  </h1>
                  <StarScore score={94} size="lg" />
                </div>
                <div className="flex items-center gap-6 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">Lagos, NG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-accent/15 text-accent uppercase tracking-widest px-4">Music</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="w-full justify-start gap-8 bg-transparent border-b border-border rounded-none h-auto p-0 mb-8">
                  <TabsTrigger 
                    value="story" 
                    className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent px-0 pb-4 h-auto"
                  >
                    Story
                  </TabsTrigger>
                  <TabsTrigger 
                    value="portfolio" 
                    className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent px-0 pb-4 h-auto"
                  >
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger 
                    value="projections" 
                    className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent px-0 pb-4 h-auto"
                  >
                    Projections
                  </TabsTrigger>
                  <TabsTrigger 
                    value="updates" 
                    className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent px-0 pb-4 h-auto"
                  >
                    Updates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="investors" 
                    className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent px-0 pb-4 h-auto"
                  >
                    Investors
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="story" className="mt-0">
                  <div className="prose prose-invert max-w-none space-y-8">
                    <div className="aspect-video bg-surface-raised rounded-card flex items-center justify-center">
                      <Button variant="outline" size="icon" className="w-16 h-16 rounded-full bg-accent text-text-primary hover:bg-accent/90 border-none shadow-xl">
                        <Play className="w-6 h-6 fill-current" />
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <h2 className="text-3xl font-heading font-bold">The Vision</h2>
                      <p className="text-lg text-text-secondary leading-relaxed">
                        I've been making music in Lagos for the past 5 years. I've seen how hard it is to get noticed without big label backing. UpNext gives me the chance to raise capital directly from the people who believe in me most.
                      </p>
                      <p className="text-lg text-text-secondary leading-relaxed">
                        With this $20,000, I'll be able to produce my debut album, film three music videos, and go on a 5-city tour across West Africa. In return, I'm offering 5% of my total career earnings for the next 10 years.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Use of Funds</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between text-sm">
                            <span className="text-text-secondary font-ui uppercase">Production</span>
                            <span className="font-numbers font-bold">40%</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-text-secondary font-ui uppercase">Marketing</span>
                            <span className="font-numbers font-bold">30%</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-text-secondary font-ui uppercase">Touring</span>
                            <span className="font-numbers font-bold">20%</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-text-secondary font-ui uppercase">Living</span>
                            <span className="font-numbers font-bold">10%</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Career Highlights</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-sm text-text-secondary font-ui">
                            <ChevronRight className="w-3 h-3 text-accent" />
                            <span>100k+ Spotify Monthly Listeners</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-text-secondary font-ui">
                            <ChevronRight className="w-3 h-3 text-accent" />
                            <span>Winner, Lagos Indie Artist 2025</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-text-secondary font-ui">
                            <ChevronRight className="w-3 h-3 text-accent" />
                            <span>Featured on "Best of Africa" 2026</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-surface-raised p-8 rounded-card border border-border mt-12">
                      <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck className="w-8 h-8 text-green" />
                        <div>
                          <h3 className="text-xl font-heading font-bold">Trust & Security</h3>
                          <p className="text-sm text-text-secondary">Your investment is protected by multiple layers of security.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">2% Insurance Pool</h4>
                          <p className="text-[10px] text-text-secondary leading-relaxed uppercase tracking-wider">
                            2% of your investment automatically goes into the UpNext Protection Pool, covering you if the talent ghosts or fails to report earnings.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">30-Day Money Back</h4>
                          <p className="text-[10px] text-text-secondary leading-relaxed uppercase tracking-wider">
                            If this is your first investment and the talent doesn't post an update within 30 days, you can request a full refund of your capital.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolio">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="bg-surface group cursor-pointer hover:border-accent/50 transition-all">
                        <div className="aspect-square bg-surface-raised relative overflow-hidden rounded-t-card">
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-12 h-12 text-text-primary fill-current" />
                          </div>
                          <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold">Song Title {i}</h4>
                          <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Single • 2026</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="projections">
                  <div className="space-y-8">
                    <Card className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          Earnings Forecast
                        </h3>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-accent border-accent/30">AI Powered</Badge>
                      </div>
                      <div className="h-64 bg-surface-raised rounded-card border border-border flex items-center justify-center">
                        <p className="text-text-muted font-mono text-sm uppercase tracking-widest">[Interactive AI Growth Projection Placeholder]</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="p-4 bg-surface-raised rounded-lg border border-border">
                          <p className="text-[8px] text-text-muted uppercase tracking-widest mb-1">Growth Velocity</p>
                          <p className="text-lg font-numbers font-bold text-green">+34.2%</p>
                        </div>
                        <div className="p-4 bg-surface-raised rounded-lg border border-border">
                          <p className="text-[8px] text-text-muted uppercase tracking-widest mb-1">Market Timing</p>
                          <p className="text-lg font-numbers font-bold text-accent">9.4/10</p>
                        </div>
                        <div className="p-4 bg-surface-raised rounded-lg border border-border">
                          <p className="text-[8px] text-text-muted uppercase tracking-widest mb-1">Risk Score</p>
                          <p className="text-lg font-numbers font-bold text-gold">LOW</p>
                        </div>
                      </div>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="p-6">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-widest text-text-muted mb-4">ROI vs Markets</h4>
                        <ul className="space-y-4">
                          <li className="flex justify-between items-center">
                            <span className="text-text-secondary font-ui uppercase">S&P 500</span>
                            <span className="font-numbers font-bold text-red">-8.2% vs Chioma</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-text-secondary font-ui uppercase">Bitcoin</span>
                            <span className="font-numbers font-bold text-red">-15.4% vs Chioma</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-text-secondary font-ui uppercase">Gold</span>
                            <span className="font-numbers font-bold text-red">-24.1% vs Chioma</span>
                          </li>
                        </ul>
                      </Card>
                      <Card className="p-6">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-widest text-text-muted mb-4">Comparable Talent</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-border" />
                              <span className="text-sm font-ui text-text-primary uppercase">Femi.SPT</span>
                            </div>
                            <span className="font-numbers font-bold text-green">+412% ROI</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-border" />
                              <span className="text-sm font-ui text-text-primary uppercase">Jade.ART</span>
                            </div>
                            <span className="font-numbers font-bold text-green">+187% ROI</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Investment Widget */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="sticky top-24 border-border shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-widest">Raising</p>
                      <p className="text-2xl font-numbers font-bold text-text-primary">$20,000</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[10px] text-text-muted uppercase tracking-widest">Funded</p>
                      <p className="text-2xl font-numbers font-bold text-accent">$14,500</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent-alt" style={{ width: '72%' }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-accent">72% Goal Reached</span>
                      <span className="text-text-muted">12 Days Remaining</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-text-muted" />
                      <span className="text-xs font-numbers font-bold text-text-primary">87 Investors</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <Clock className="w-4 h-4 text-text-muted" />
                      <span className="text-xs font-numbers font-bold text-text-primary">Closes Apr 1</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="invest-amount" className="uppercase tracking-widest text-[10px] font-bold">Investment Amount ($)</Label>
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-text-muted cursor-help group">
                        <Info className="w-3 h-3" />
                        Fractional Shares Active
                      </div>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input 
                        id="invest-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10 h-14 bg-surface-raised border-border text-lg font-numbers"
                        placeholder="100"
                      />
                    </div>
                    <div className="flex gap-2">
                      {["50", "100", "500", "1000"].map((v) => (
                        <Button 
                          key={v} 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 font-numbers"
                          onClick={() => setAmount(v)}
                        >
                          ${v}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-raised rounded-card border border-border group cursor-pointer hover:border-accent/50 transition-colors"
                       onClick={() => setShowAutoInvest(!showAutoInvest)}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 border-accent transition-all",
                        showAutoInvest ? "bg-accent" : "bg-transparent"
                      )} />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Enable Auto-Reinvest</span>
                    </div>
                    <Badge variant="outline" className="text-[8px] uppercase border-accent/20 text-accent">DCA Active</Badge>
                  </div>

                  <Card className="bg-surface-raised border-accent/20 p-4 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold">Investment Calculator</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary font-ui uppercase">You Own</span>
                        <span className="font-numbers font-bold text-text-primary">{returns.equity.toFixed(2)}% Equity</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary font-ui uppercase">Low Scenario</span>
                        <span className="font-numbers font-bold text-text-primary">${returns.low.toLocaleString()} return</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary font-ui uppercase">Mid Scenario</span>
                        <span className="font-numbers font-bold text-accent">${returns.mid.toLocaleString()} return</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary font-ui uppercase">High Scenario</span>
                        <span className="font-numbers font-bold text-gold">${returns.high.toLocaleString()} return</span>
                      </div>
                      <div className="pt-2 border-t border-border flex justify-between text-[10px] uppercase tracking-widest">
                        <span className="text-text-muted">Estimated Break-even</span>
                        <span className="text-text-primary font-bold">{returns.breakEven}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-muted">
                      <span>Platform Fee (0.5%)</span>
                      <span className="font-numbers font-bold">${(parseFloat(amount) * 0.005 || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-muted">
                      <span>Insurance Pool (2%)</span>
                      <span className="font-numbers font-bold">${(parseFloat(amount) * 0.02 || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-muted">
                      <span>Network Fee</span>
                      <span className="font-numbers font-bold text-green">GASLESS</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild variant="investment" size="lg" className="w-full h-14 text-lg group">
                    <Link href={`/invest/chioma-music?amount=${amount}`}>
                      Invest Now
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-surface-raised border-border p-6 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs uppercase tracking-widest text-text-muted relative z-10">Share Certificate Preview</h4>
                  <Badge className="bg-gold text-black text-[8px] uppercase font-bold px-2 py-0.5">Legendary NFT</Badge>
                </div>
                <div className="aspect-[3/4] rounded-lg border border-border bg-black p-6 flex flex-col justify-between relative z-10 group-hover:border-accent transition-colors duration-500">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-mono text-text-muted">Certificate No.</p>
                      <p className="text-[10px] font-mono text-accent">#UPNEXT-842-77</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-mono text-text-muted">Asset Class: Human Potential</p>
                    <h5 className="text-2xl font-heading font-bold uppercase leading-none">Chioma Music</h5>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                    <div>
                      <p className="text-[8px] uppercase font-mono text-text-muted mb-1">Ownership</p>
                      <p className="text-sm font-numbers font-bold">{returns.equity.toFixed(3)}%</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase font-mono text-text-muted mb-1">Amount</p>
                      <p className="text-sm font-numbers font-bold">${amount}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase font-mono text-text-muted">Issue Date</p>
                      <p className="text-[8px] font-mono text-text-primary uppercase tracking-tighter">17 MAR 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] uppercase font-mono text-text-muted mb-1">Verified On-Chain</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5, 6].map((b) => (
                          <div key={b} className="w-2 h-0.5 bg-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-center text-text-muted mt-4 uppercase tracking-widest">Dynamic SVG Certificate • Minted on Polygon</p>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <LiveTicker />
        </div>
      </main>
    </div>
  )
}
