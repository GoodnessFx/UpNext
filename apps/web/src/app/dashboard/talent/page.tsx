"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { Badge } from "@upnext/ui"
import { 
  TrendingUp, 
  Users, 
  Clock, 
  MessageSquare, 
  Plus, 
  BarChart3, 
  Calendar,
  Search,
  ChevronRight,
  Upload,
  DollarSign,
  Music,
  Youtube,
  Video,
  ExternalLink,
  Award,
  Zap,
  Handshake
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useRealTimeData } from "@/lib/sim-data"

export default function TalentDashboard() {
  const { data: stats, lastUpdated, isSyncing } = useRealTimeData({
    fundingProgress: 14500,
    investors: 87,
    daysLeft: 12,
    earnings: 4240
  }, 3500)

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-end mb-4 h-4">
          {isSyncing && (
            <div className="flex items-center gap-2 text-[8px] text-accent animate-pulse uppercase font-bold">
              <Zap className="w-3 h-3 fill-current" />
              Syncing Oracle Data...
            </div>
          )}
          {!isSyncing && (
            <div className="text-[8px] text-text-muted uppercase font-bold">
              Oracle Sync: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        {/* Talent Profile Stats */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-surface-raised rounded-card border border-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-card bg-surface border border-border flex items-center justify-center text-accent shadow-xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent-alt" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-heading font-bold uppercase">Chioma Music</h2>
                <Badge className="bg-green text-white text-[10px] uppercase font-bold px-2 py-0.5">Verified Talent</Badge>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-widest font-bold">
                  <Award className="w-4 h-4 text-accent" />
                  Credit Score: 842
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-widest font-bold">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  AI Star Score: 94
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <Button asChild variant="outline" size="lg" className="gap-2 group border-accent/20 text-accent">
              <Link href="/talent/chioma-music">
                <ExternalLink className="w-4 h-4" />
                Public Profile
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-accent/20">
              <Link href="/dashboard/talent">
                <MessageSquare className="w-4 h-4" />
                Post Update
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2 uppercase tracking-tight">Campaign Manager</h1>
            <p className="text-text-secondary font-body">Track your funding progress and manage your investors.</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/clubs">
                <Handshake className="w-4 h-4" />
                Collab Board
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-2">
              <Link href="/launchpad">
                <Plus className="w-4 h-4" />
                New Campaign
              </Link>
            </Button>
          </div>
        </div>

        {/* Milestone Progress */}
        <div className="mb-12 p-8 bg-surface rounded-card border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
              <Zap className="w-5 h-5 text-accent" />
              Milestone Unlocks
            </h3>
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">2 / 4 Completed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Studio Production", amount: "$5,000", status: "completed" },
              { label: "Music Video", amount: "$5,000", status: "completed" },
              { label: "Lagos Release Event", amount: "$5,000", status: "in_progress" },
              { label: "West Africa Tour", amount: "$5,000", status: "locked" },
            ].map((m, i) => (
              <div key={m.label} className={cn(
                "p-4 rounded-lg border flex flex-col gap-2 relative overflow-hidden",
                m.status === "completed" ? "bg-green/5 border-green/20" : 
                m.status === "in_progress" ? "bg-accent/5 border-accent/20" : "bg-surface-raised border-border opacity-50"
              )}>
                <p className="text-[8px] uppercase tracking-widest font-bold text-text-muted">Milestone 0{i+1}</p>
                <p className="text-sm font-heading font-bold uppercase">{m.label}</p>
                <p className="text-lg font-numbers font-bold text-text-primary">{m.amount}</p>
                {m.status === "completed" && <div className="absolute top-2 right-2"><Award className="w-4 h-4 text-green" /></div>}
                {m.status === "in_progress" && <Button size="sm" className="mt-2 text-[10px] uppercase font-bold py-0 h-6">Request Unlock</Button>}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: "Funding Progress", value: `$${stats.fundingProgress.toLocaleString()}`, total: "/ $20k", icon: TrendingUp, color: "text-accent" },
            { label: "Investors", value: Math.floor(stats.investors).toString(), total: "people", icon: Users, color: "text-accent" },
            { label: "Days Left", value: Math.max(0, Math.floor(stats.daysLeft)).toString(), total: "days", icon: Clock, color: "text-gold" },
            { label: "Earnings To Date", value: `$${stats.earnings.toLocaleString()}`, total: "USD", icon: DollarSign, color: "text-green" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-surface p-6 hover:bg-surface-raised transition-colors border-border">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <p className={`text-3xl font-numbers font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-text-muted font-numbers font-medium">{stat.total}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Earnings Reporting & Aggregator */}
          <Card className="lg:col-span-8 p-8 bg-surface border-border">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
                <DollarSign className="w-5 h-5 text-accent" />
                Earnings Aggregator
              </h3>
              <Badge variant="secondary" className="bg-accent/15 text-accent text-[10px] uppercase font-bold px-4 py-1">Verified via Oracle</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Spotify", icon: Music, color: "text-[#1DB954]", status: "Connected" },
                { name: "YouTube", icon: Youtube, color: "text-[#FF0000]", status: "Connected" },
                { name: "Apple Music", icon: Music, color: "text-[#FC3C44]", status: "Connected" },
                { name: "TikTok", icon: Video, color: "text-[#000000]", status: "Connect" },
              ].map((platform) => (
                <div key={platform.name} className="p-4 bg-surface-raised rounded-card border border-border group hover:border-accent transition-colors cursor-pointer text-center">
                  <platform.icon className={cn("w-8 h-8 mx-auto mb-2 transition-colors", platform.color)} />
                  <p className="text-xs font-heading font-bold uppercase">{platform.name}</p>
                  <p className={cn(
                    "text-[8px] uppercase tracking-widest font-bold mt-1",
                    platform.status === "Connected" ? "text-green" : "text-text-muted"
                  )}>{platform.status}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-accent/5 border border-accent/20 rounded-card mb-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-bold text-accent uppercase tracking-widest">Verified Total Earnings</h4>
                  <p className="text-2xl font-numbers font-bold text-text-primary">$4,240.50</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Due for Distribution</p>
                  <p className="text-sm font-numbers font-bold text-text-primary">$424.05 (10%)</p>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 text-[10px] uppercase font-bold tracking-widest gap-2" onClick={() => alert("Syncing with Oracle...")}>
              <Zap className="w-4 h-4" />
              Sync All Platforms & Report
            </Button>
          </Card>

          {/* Perks Marketplace */}
          <Card className="lg:col-span-4 p-8 bg-surface border-border">
            <h3 className="text-xl font-heading font-bold mb-8 flex items-center gap-2 uppercase tracking-tight">
              <Award className="w-5 h-5 text-gold" />
              Perks Marketplace
            </h3>
            <div className="space-y-6">
              {[
                { name: "VIP Concert Tickets", price: "200 Shares", left: "5/10" },
                { name: "Signed Vinyl", price: "50 Shares", left: "12/50" },
                { name: "Studio Session Visit", price: "500 Shares", left: "2/5" },
                { name: "Personal Shoutout", price: "10 Shares", left: "Unlimited" },
              ].map((perk) => (
                <div key={perk.name} className="p-4 bg-surface-raised rounded-lg border border-border group cursor-pointer hover:border-accent/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-heading font-bold uppercase">{perk.name}</p>
                    <Badge variant="outline" className="text-[8px] uppercase">{perk.left}</Badge>
                  </div>
                  <p className="text-xs font-numbers font-bold text-accent">{perk.price}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 text-[10px] uppercase font-bold tracking-widest">Manage Perks</Button>
          </Card>

          {/* Recent Investors */}
          <Card className="lg:col-span-12 p-0 bg-surface overflow-hidden border-border">
            <div className="p-8 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
                <Users className="w-5 h-5 text-accent" />
                Recent Backers
              </h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Message All</Button>
                <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Export CRM</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-raised border-b border-border">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Investor</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Amount</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Shares</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Date</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Reputation</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "tunde.eth", amount: "$1,250", shares: "0.312%", rep: "Shark" },
                    { name: "chioma.sol", amount: "$500", shares: "0.125%", rep: "Angel" },
                    { name: "emeka.lens", amount: "$2,000", shares: "0.500%", rep: "Legend" },
                    { name: "femi.base", amount: "$100", shares: "0.025%", rep: "Scout" },
                  ].map((backer, i) => (
                    <tr key={backer.name} className="hover:bg-surface-raised transition-colors cursor-pointer group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center font-bold text-accent">
                            {backer.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-text-primary uppercase tracking-tight">{backer.name}</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest">Verified Backer</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">{backer.amount}</td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">{backer.shares}</td>
                      <td className="px-8 py-6 font-mono text-[10px] text-text-muted uppercase tracking-widest">12 MAR 2026</td>
                      <td className="px-8 py-6">
                        <Badge variant="outline" className="text-[8px] uppercase border-accent/20 text-accent font-bold">{backer.rep}</Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Message</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
