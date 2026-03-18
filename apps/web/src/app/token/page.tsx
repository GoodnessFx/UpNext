"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Progress } from "@upnext/ui"
import { Coins, Zap, TrendingUp, ArrowUpRight, Shield, ArrowRight, Wallet, History } from "lucide-react"

export default function TokenPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">$UPN Token</h1>
            <p className="text-text-secondary font-body">Stake to reduce fees, vote on governance, and earn rewards.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent h-12 px-8">
              <History className="w-4 h-4" />
              History
            </Button>
            <Button className="gap-2 uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-accent/20">
              <Coins className="w-4 h-4" />
              Buy $UPN
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <Card className="lg:col-span-4 bg-surface border-accent/20 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardHeader>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Your Balance</p>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-4xl font-numbers font-bold text-text-primary">12,450.00</CardTitle>
                <span className="text-lg font-heading font-bold text-accent">$UPN</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 border-t border-border">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                <span className="text-text-muted">Value in USD</span>
                <span className="text-text-primary">$1,245.00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8 bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-xl uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent fill-current" />
                Fee Tier Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Current Tier</p>
                  <p className="text-2xl font-heading font-bold text-accent uppercase">Tier 2: Angel</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Platform Fee</p>
                  <p className="text-2xl font-numbers font-bold text-text-primary">1.5% <span className="text-sm text-text-muted strike-through">2.5%</span></p>
                </div>
              </div>
              <Progress value={65} className="h-2 bg-border" />
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Stake 2,550 more $UPN to unlock <span className="text-accent">Tier 3 (1.0% Fee)</span></p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card className="bg-surface border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-xl uppercase tracking-tight">Staking Pool</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Total Staked</p>
                    <p className="text-2xl font-numbers font-bold text-text-primary">8.4M $UPN</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Current APY</p>
                    <p className="text-2xl font-numbers font-bold text-green">12.4%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Lock Period</p>
                    <p className="text-2xl font-heading font-bold text-text-primary">30 DAYS</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 h-14 uppercase tracking-widest text-[10px] font-bold">Stake $UPN</Button>
                  <Button variant="outline" className="flex-1 h-14 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent">Unstake</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tight flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent" />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xs text-text-secondary leading-relaxed uppercase tracking-widest font-medium">
                  Use your $UPN to vote on platform upgrades, new talent categories, and insurance claims.
                </p>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-surface-raised rounded-lg border border-border group cursor-pointer hover:border-accent/30 transition-all">
                      <p className="text-[10px] text-accent font-bold uppercase mb-1">Active Proposal</p>
                      <p className="text-sm font-heading font-bold uppercase leading-tight mb-2">UP-842: Add E-Sports Category</p>
                      <div className="flex justify-between items-center text-[8px] uppercase font-bold text-text-muted">
                        <span>84% For</span>
                        <span>Ends in 2d</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full text-text-muted uppercase tracking-widest text-[10px] font-bold">View DAO Dashboard</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
