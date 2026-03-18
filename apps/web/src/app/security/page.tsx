"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { ShieldAlert, Bug, Lock, FileCheck, Send, ExternalLink } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight mb-12">Security Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-surface border-border p-8">
            <ShieldAlert className="w-12 h-12 text-accent mb-6" />
            <h2 className="text-2xl font-heading font-bold uppercase mb-4">Bug Bounty</h2>
            <p className="text-text-secondary text-sm uppercase tracking-widest leading-relaxed mb-8">
              Help us secure the Talent Stock Market. We offer bounties up to $50,000 for critical vulnerabilities.
            </p>
            <Button className="w-full gap-2 uppercase tracking-widest text-[10px] font-bold h-12">
              <Send className="w-4 h-4" />
              Report Vulnerability
            </Button>
          </Card>

          <Card className="bg-surface border-border p-8">
            <FileCheck className="w-12 h-12 text-green mb-6" />
            <h2 className="text-2xl font-heading font-bold uppercase mb-4">Audit Reports</h2>
            <p className="text-text-secondary text-sm uppercase tracking-widest leading-relaxed mb-8">
              All UpNext smart contracts are audited by leading security firms before deployment.
            </p>
            <Button variant="outline" className="w-full gap-2 uppercase tracking-widest text-[10px] font-bold h-12 border-accent/20 text-accent">
              <ExternalLink className="w-4 h-4" />
              View Certik Audit
            </Button>
          </Card>
        </div>

        <Card className="bg-surface border-border overflow-hidden">
          <CardHeader className="bg-surface-raised border-b border-border">
            <CardTitle className="text-lg uppercase tracking-tight">Bounty Program Tiers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-raised/50 border-b border-border">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Severity</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-text-muted font-bold">Bounty Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { level: "Critical", amount: "$10,000 - $50,000", color: "text-red" },
                    { level: "High", amount: "$2,000 - $10,000", color: "text-orange-500" },
                    { level: "Medium", amount: "$500 - $2,000", color: "text-gold" },
                    { level: "Low", amount: "$100 - $500", color: "text-blue-500" },
                  ].map((tier) => (
                    <tr key={tier.level}>
                      <td className={cn("px-8 py-6 font-heading font-bold uppercase", tier.color)}>{tier.level}</td>
                      <td className="px-8 py-6 font-numbers font-bold text-text-primary">{tier.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

import { cn } from "@/lib/utils"
