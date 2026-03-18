"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { Terminal, Code, Database, Globe, Key, ArrowRight, ExternalLink } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">API Documentation</h1>
            <p className="text-text-secondary font-body">Build on the Talent Stock Market protocol.</p>
          </div>
          <Button variant="outline" className="gap-2 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent h-12 px-8">
            <ExternalLink className="w-4 h-4" />
            Swagger UI
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "Authentication", icon: Key, desc: "Bearer token via OAuth or SIWE." },
            { title: "Webhooks", icon: Database, desc: "Real-time event notifications." },
            { title: "SDKs", icon: Code, desc: "JS/TS, Python, and Go support." },
          ].map((item) => (
            <Card key={item.title} className="bg-surface border-border p-6">
              <item.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-heading font-bold uppercase mb-2">{item.title}</h3>
              <p className="text-xs text-text-secondary uppercase tracking-widest">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-surface border-border overflow-hidden">
          <CardHeader className="bg-surface-raised border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-sm uppercase tracking-tight font-mono">GET /v1/talent/{`{slug}`}</CardTitle>
            <Badge variant="outline" className="bg-green/10 text-green border-green/20">PUBLIC</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-black p-6 font-mono text-xs text-green-400 overflow-x-auto">
              <pre>{`{
  "status": "success",
  "data": {
    "name": "Chioma Music",
    "symbol": "CHIOMA.MUS",
    "star_score": 94,
    "implied_valuation": 240000,
    "total_raised": 14500,
    "backers": 87
  }
}`}</pre>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
