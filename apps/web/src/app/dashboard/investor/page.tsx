"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { Badge } from "@upnext/ui"
import { 
  TrendingUp, 
  ArrowUpRight, 
  Wallet, 
  Briefcase, 
  BarChart3, 
  PieChart,
  Calendar,
  Search,
  ChevronRight,
  Shield,
  Zap,
  Trophy,
  Users,
  AlertCircle,
  Share2
} from "lucide-react"

import { InvestorFlexCard } from "@/components/flex-card"
import { useRealTimeData, storageService } from "@/lib/sim-data"
import { useState, useEffect } from "react"

export default function InvestorDashboard() {
  const [history, setHistory] = useState<any[]>([])
  
  const { data: stats, lastUpdated, isSyncing } = useRealTimeData({
    totalInvested: 12450,
    portfolioValue: 18240,
    totalReturns: 2840,
    roi: 67.2
  }, 4000)

  useEffect(() => {
    setHistory(storageService.getHistory())
  }, [])

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-end mb-4 h-4">
          {isSyncing && (
            <div className="flex items-center gap-2 text-[8px] text-accent animate-pulse uppercase font-bold">
              <Zap className="w-3 h-3 fill-current" />
              Syncing Real-time Data...
            </div>
          )}
          {!isSyncing && (
            <div className="text-[8px] text-text-muted uppercase font-bold">
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        {/* User Level & XP */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-surface-raised rounded-card border border-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-alt flex items-center justify-center text-white border-4 border-background shadow-xl">
              <Zap className="w-10 h-10 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-heading font-bold uppercase">Level: Angel</h2>
                <Badge className="bg-accent text-white text-[10px] uppercase font-bold px-2 py-0.5">Top 5%</Badge>
              </div>
              <p className="text-text-secondary text-sm uppercase tracking-widest font-medium">8,450 XP / 10,000 XP to Shark</p>
              <div className="w-64 h-2 bg-border rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-accent" style={{ width: '84.5%' }} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="text-center px-6 border-r border-border">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Streak</p>
              <p className="text-2xl font-numbers font-bold text-accent">14 Days</p>
            </div>
            <div className="text-center px-6">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Achievements</p>
              <p className="text-2xl font-numbers font-bold text-text-primary">12 NFT</p>
            </div>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">Portfolio Overview</h1>
            <p className="text-text-secondary font-body">Manage your talent investments and returns.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="gap-2 group">
              <Calendar className="w-4 h-4 group-hover:text-accent transition-colors" />
              Payout Calendar
            </Button>
            <Button size="lg" className="gap-2 shadow-lg shadow-accent/20">
              <Search className="w-4 h-4" />
              Discover Talent
            </Button>
          </div>
        </div>

        {/* Portfolio Health Alert */}
        <div className="mb-12 p-4 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gold" />
            <p className="text-sm text-text-primary font-medium">
              <span className="font-bold uppercase tracking-wider text-gold mr-2">Rebalance Suggestion:</span>
              You're 80% concentrated in Music. Diversify into Sports or Tech to reduce risk.
            </p>
          </div>
          <Button variant="link" className="text-gold uppercase tracking-widest text-[10px] font-bold">View Suggestions</Button>
        </div>

        {/* Viral Share & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Share2 className="w-5 h-5 text-accent" />
              Viral Flex Card
            </h3>
            <InvestorFlexCard 
              talentName="Chioma Music"
              initialFollowers="2k"
              currentFollowers="2M"
              investment={100}
              currentValue={4200}
            />
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
            {[
              { label: "Total Invested", value: `$${stats.totalInvested.toLocaleString()}`, change: "+12%", icon: Wallet },
              { label: "Portfolio Value", value: `$${stats.portfolioValue.toLocaleString()}`, change: "+46%", icon: TrendingUp },
              { label: "Total Returns", value: `$${stats.totalReturns.toLocaleString()}`, change: "+8%", icon: Briefcase },
              { label: "Overall ROI", value: `${stats.roi.toFixed(1)}%`, change: "+5%", icon: ArrowUpRight },
            ].map((stat) => (
              <Card key={stat.label} className="bg-surface p-6 hover:bg-surface-raised transition-colors border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="success" className="bg-green/15 text-green text-[10px] uppercase font-bold px-2 py-0.5">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                <p className="text-3xl font-numbers font-bold text-text-primary">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Bundles */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
              <Zap className="w-5 h-5 text-accent" />
              Investment Bundles
            </h3>
            <Button variant="link" className="text-accent uppercase tracking-widest text-[10px] font-bold">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "The Lagos Pack", desc: "5 rising Afrobeats stars", roi: "+124%", color: "from-accent to-accent-alt" },
              { name: "E-Sports Elite", desc: "Top 10 FIFA players", roi: "+86%", color: "from-blue-600 to-blue-400" },
              { name: "Gen Z Creators", desc: "Fastest growing TikTokers", roi: "+210%", color: "from-purple-600 to-purple-400" },
            ].map((bundle) => (
              <Card key={bundle.name} className="p-6 bg-surface hover:border-accent/50 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bundle.color} mb-4 flex items-center justify-center text-white`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-heading font-bold mb-1 group-hover:text-accent transition-colors">{bundle.name}</h4>
                <p className="text-xs text-text-secondary mb-4 uppercase tracking-wider">{bundle.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green font-numbers font-bold">{bundle.roi} Est. ROI</span>
                  <Button asChild size="sm" variant="outline" className="text-[10px] uppercase font-bold">
                    <Link href="/discover">Invest One-Click</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Portfolio Chart */}
          <Card className="lg:col-span-8 p-8 bg-surface border-border">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
                <BarChart3 className="w-5 h-5 text-accent" />
                Performance Chart
              </h3>
              <div className="flex gap-2">
                {["7D", "1M", "3M", "6M", "1Y", "ALL"].map((p) => (
                  <Button key={p} variant="ghost" size="sm" className="text-[10px] px-3 h-8 font-bold">{p}</Button>
                ))}
              </div>
            </div>
            <div className="h-80 bg-surface-raised rounded-card border border-border flex items-center justify-center">
              <p className="text-text-muted font-mono text-sm uppercase tracking-widest">[Interactive Recharts LineChart Placeholder]</p>
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="lg:col-span-4 p-8 bg-surface border-border">
            <h3 className="text-xl font-heading font-bold mb-8 flex items-center gap-2 uppercase tracking-tight">
              <Trophy className="w-5 h-5 text-gold" />
              Top Investors
            </h3>
            <div className="space-y-6">
              {[
                { name: "tunde.eth", roi: "245%", xp: "Legend" },
                { name: "chioma.sol", roi: "189%", xp: "Shark" },
                { name: "emeka.lens", roi: "156%", xp: "Angel" },
                { name: "femi.base", roi: "142%", xp: "Angel" },
              ].map((investor, i) => (
                <div key={investor.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-text-muted font-bold w-4">0{i+1}</span>
                    <div className="w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center text-accent font-bold">
                      {investor.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold uppercase">{investor.name}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest">{investor.xp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-numbers font-bold text-green">+{investor.roi}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-8 text-text-muted uppercase tracking-widest text-[10px] font-bold">View Global Leaderboard</Button>
          </Card>

          {/* Sector Allocation */}
          <Card className="lg:col-span-4 p-8 bg-surface flex flex-col border-border">
            <h3 className="text-xl font-heading font-bold mb-8 flex items-center gap-2 uppercase tracking-tight">
              <PieChart className="w-5 h-5 text-accent" />
              Sector Allocation
            </h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-full border-[16px] border-border relative mb-8">
                <div className="absolute inset-0 border-[16px] border-accent rounded-full border-t-transparent border-l-transparent rotate-45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-numbers font-bold text-text-primary">8</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">Talents</p>
                </div>
              </div>
              <div className="w-full space-y-4">
                {[
                  { label: "Music", value: "40%", color: "bg-accent" },
                  { label: "Sports", value: "30%", color: "bg-accent-alt" },
                  { label: "Art", value: "30%", color: "bg-gold" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.color}`} />
                      <span className="text-text-secondary font-ui uppercase tracking-wider">{s.label}</span>
                    </div>
                    <span className="font-numbers font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Holdings Table */}
          <Card className="lg:col-span-12 p-0 bg-surface overflow-hidden border-border">
            <div className="p-8 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2 uppercase tracking-tight">
                <Briefcase className="w-5 h-5 text-accent" />
                Your Holdings
              </h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2 uppercase tracking-widest text-[10px] font-bold" onClick={() => alert("Rebalancing Portfolio...")}>
                  <Zap className="w-4 h-4" />
                  Auto-Rebalance
                </Button>
                <Button variant="outline" size="sm" className="gap-2 uppercase tracking-widest text-[10px] font-bold" onClick={() => alert("Exporting CSV...")}>Export CSV</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-raised border-b border-border">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Talent</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Invested</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Current Value</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Returns</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">ROI</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Status</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.length > 0 ? history.filter(h => h.action === 'INVESTMENT').map((h, i) => (
                    <tr key={h.id} className="hover:bg-surface-raised transition-colors cursor-pointer group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-card bg-accent/10 border border-accent/20 overflow-hidden flex items-center justify-center text-accent font-bold">
                            {h.metadata.talent[0]}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-text-primary uppercase">{h.metadata.talent}</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest">Investment • {new Date(h.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">${h.metadata.amount.toLocaleString()}</td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">${(h.metadata.amount * 1.2).toLocaleString()}</td>
                      <td className="px-8 py-6 font-numbers font-bold text-green">+${(h.metadata.amount * 0.2).toLocaleString()}</td>
                      <td className="px-8 py-6 font-numbers font-bold text-green">+20%</td>
                      <td className="px-8 py-6">
                        <Badge variant="success" className="bg-green/15 text-green text-[10px] uppercase font-bold">VERIFIED</Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                      </td>
                    </tr>
                  )) : [1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-surface-raised transition-colors cursor-pointer group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-card bg-surface-raised border border-border overflow-hidden" />
                          <div>
                            <p className="font-heading font-bold text-text-primary uppercase">Chioma Music</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest">Music • Lagos</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">$500.00</td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">$1,240.00</td>
                      <td className="px-8 py-6 font-numbers font-bold text-green">+$240.00</td>
                      <td className="px-8 py-6 font-numbers font-bold text-green">+148%</td>
                      <td className="px-8 py-6">
                        <Badge variant="success" className="bg-green/15 text-green text-[10px] uppercase font-bold">Active</Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-surface-raised text-center">
              <Button variant="link" className="text-text-muted uppercase tracking-widest text-[10px] font-bold">View all activity</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
