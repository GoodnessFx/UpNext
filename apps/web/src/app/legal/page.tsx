"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from "@upnext/ui"
import { FileText, Shield, Scale, Info, Download } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight mb-12">Legal & Compliance</h1>

        <div className="space-y-8">
          {[
            { title: "Income Sharing Agreement (ISA)", desc: "The standard legal contract governing all talent investments.", icon: FileText },
            { title: "Risk Disclosure", desc: "Important information about the risks of talent investing.", icon: Info },
            { title: "Terms of Service", desc: "The rules of the UpNext platform.", icon: Scale },
            { title: "Privacy Policy", desc: "How we handle your data and on-chain identity.", icon: Shield },
          ].map((doc) => (
            <Card key={doc.title} className="bg-surface border-border group hover:border-accent/30 transition-all cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center text-accent">
                    <doc.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold uppercase text-lg mb-1">{doc.title}</h3>
                    <p className="text-xs text-text-secondary uppercase tracking-widest">{doc.desc}</p>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="rounded-full border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Download className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
