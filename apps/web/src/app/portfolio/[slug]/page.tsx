"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@upnext/ui"
import { TrendingUp, Users, Award, MapPin, Share2, Star, ChevronRight, Play } from "lucide-react"
import { VerifiedBadge } from "@/components/verified-badge"
import { StarScore } from "@/components/star-score"

export default function PublicPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-20">
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
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-sm uppercase tracking-widest font-bold">Credit: 842</span>
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
                <Button className="rounded-pill px-8 bg-accent text-white">Invest</Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6">Bio</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Chioma is a rising Afrobeats star from Lagos, Nigeria. Her unique blend of traditional rhythms and modern production has garnered over 100k monthly listeners on Spotify.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-heading font-bold mb-6">Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-surface group cursor-pointer hover:border-accent/50 transition-all overflow-hidden">
                    <div className="aspect-video bg-surface-raised relative">
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-current" />
                      </div>
                      <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-heading font-bold uppercase tracking-tight">Song Title {i}</h4>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Single • 2026</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-surface p-6 border-border">
              <h3 className="text-xl font-heading font-bold mb-6 uppercase tracking-tight">Public Stats</h3>
              <div className="space-y-6">
                {[
                  { label: "Total Raised", value: "$14.5k", total: "/ $20k" },
                  { label: "Backers", value: "87", total: "people" },
                  { label: "Implied Value", value: "$240k", total: "USD" },
                  { label: "Growth Velocity", value: "+34%", total: "monthly" },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                      <p className="text-2xl font-numbers font-bold text-text-primary">{stat.value}</p>
                    </div>
                    <p className="text-[10px] text-text-muted font-numbers mb-1">{stat.total}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
