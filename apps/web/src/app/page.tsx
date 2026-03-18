"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { TrendingUp, Users, ArrowUpRight, Zap, Globe, ShieldCheck, ChevronRight, Play, Star } from "lucide-react"
import { LiveTicker } from "@/components/ticker"

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <Badge className="bg-surface border-border text-accent uppercase tracking-[0.2em] px-6 py-2 rounded-full font-bold text-[10px] animate-fade-in">
              The Talent Stock Market
            </Badge>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter leading-[0.9] uppercase animate-slide-up">
              Buy Shares In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-alt to-gold">Rising Stars</span>
            </h1>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg md:text-xl font-body uppercase tracking-wider leading-relaxed animate-fade-in delay-200">
              When they earn, you earn. Automatically. On-chain. <br />
              LEGALLY ENFORCED INCOME SHARING AGREEMENTS ON POLYGON.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in delay-300">
              <Button asChild size="lg" className="h-16 px-12 rounded-full bg-accent text-white text-lg font-heading font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-accent/20">
                <Link href="/discover">Start Investing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-full border-border text-text-primary text-lg font-heading font-bold uppercase tracking-widest hover:bg-surface transition-colors">
                <Link href="/discover">How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        <LiveTicker />

        {/* Features Grid */}
        <section className="py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Fractional Equity", desc: "Own a piece of a creator's future earnings for as little as $5.", icon: Zap, link: "/discover" },
            { title: "On-Chain Payouts", desc: "Returns are streamed to your wallet automatically via oracle verification.", icon: ShieldCheck, link: "/token" },
            { title: "Secondary Market", desc: "Trade your talent shares 24/7 on our high-liquidity order book.", icon: TrendingUp, link: "/secondary" },
          ].map((feature, i) => (
            <Link key={i} href={feature.link} className="space-y-6 group cursor-pointer block">
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold uppercase tracking-tight">{feature.title}</h3>
              <p className="text-text-secondary font-body uppercase tracking-wider text-sm leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </section>

        {/* Featured Campaigns */}
        <section className="py-32 bg-surface-raised border-y border-border px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight">Active Campaigns</h2>
                <p className="text-text-muted uppercase tracking-widest font-bold text-xs">Handpicked high-potential talent currently raising.</p>
              </div>
              <Button asChild variant="link" className="text-accent uppercase tracking-widest font-bold text-xs group">
                <Link href="/discover">
                  View all discovery <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Link key={i} href="/talent/chioma-music">
                  <Card className="bg-surface group hover:border-accent transition-all cursor-pointer overflow-hidden border-border">
                    <div className="aspect-[16/9] bg-surface-raised relative overflow-hidden">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-black/40 backdrop-blur-md border-white/10 uppercase font-bold text-[10px] px-3">Music</Badge>
                      </div>
                      <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">Chioma Music</h3>
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
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tight">The Future is Human Potential.</h2>
            <p className="text-xl text-text-secondary uppercase tracking-widest leading-relaxed">
              Don't just watch the next star rise. Own a piece of their success.
            </p>
            <Button asChild size="lg" className="h-20 px-16 rounded-full bg-accent text-white text-xl font-heading font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-accent/20">
              <Link href="/discover">Launch Your Portfolio</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border bg-surface-raised px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-heading font-bold text-text-primary tracking-tight">
            UP<span className="text-accent">NEXT</span>
          </div>
          <div className="flex gap-8">
            <Link href="/legal" className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors">Legal</Link>
            <Link href="/security" className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors">Security</Link>
            <Link href="/api-docs" className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors">API</Link>
            <Link href="/changelog" className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors">Changelog</Link>
          </div>
          <p className="text-[10px] uppercase font-bold text-text-muted">© 2026 UpNext Labs. Built on Polygon.</p>
        </div>
      </footer>
    </div>
  )
}
