"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Rocket, ShieldCheck, Star, Users, ArrowRight, Zap, Target } from "lucide-react"

export default function LaunchpadPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-accent text-white text-[10px] uppercase font-bold px-3 py-1">Cohort Q2 2026</Badge>
              <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Applications Open</span>
            </div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">UpNext Launchpad</h1>
            <p className="text-text-secondary font-body max-w-2xl">The elite accelerator for high-potential talent. We select 10 creators per quarter for $50k funding + guaranteed investor interest.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-accent/20">
              <Rocket className="w-4 h-4" />
              Apply Now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Elite Funding", desc: "Direct $50k injection into your career.", icon: Zap },
            { title: "Mentorship", desc: "1-on-1 access to industry veterans.", icon: Users },
            { title: "Priority Feed", desc: "Featured placement on discovery home.", icon: Target },
          ].map((feature) => (
            <Card key={feature.title} className="bg-surface border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold uppercase mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary uppercase tracking-wider leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold uppercase mb-8 flex items-center gap-3">
          <Star className="w-6 h-6 text-gold fill-current" />
          Previous Graduates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-surface group hover:border-accent transition-all cursor-pointer overflow-hidden border-border">
              <div className="aspect-[4/5] bg-surface-raised relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-black/40 backdrop-blur-md border-white/10">10x ROI</Badge>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface" />
              </div>
              <CardContent className="p-4">
                <h4 className="font-heading font-bold uppercase">Launchpad Star {i}</h4>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Lagos • Music</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
