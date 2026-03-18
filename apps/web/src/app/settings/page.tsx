"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from "@upnext/ui"
import { User, Shield, CreditCard, Bell, Smartphone, LogOut, ChevronRight } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight mb-12">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Card className="bg-surface border-border overflow-hidden">
              <div className="p-1">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "security", label: "Security", icon: Shield },
                  { id: "payments", label: "Payment Methods", icon: CreditCard },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "sessions", label: "Active Sessions", icon: Smartphone },
                ].map((item) => (
                  <button key={item.id} className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-surface-raised transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                      <span className="text-sm font-heading font-bold uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-red/5 text-red transition-colors group mt-4 border-t border-border">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-heading font-bold uppercase tracking-tight">Sign Out</span>
                </button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-surface border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-xl uppercase tracking-tight">Public Profile</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="flex items-center gap-8 mb-8">
                  <div className="w-24 h-24 rounded-full bg-surface-raised border border-border flex items-center justify-center text-accent font-bold text-3xl">T</div>
                  <Button variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-accent/20 text-accent">Change Avatar</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-text-muted">Username</Label>
                    <Input defaultValue="tunde.eth" className="bg-surface-raised border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-text-muted">Display Name</Label>
                    <Input defaultValue="Tunde" className="bg-surface-raised border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-text-muted">Bio</Label>
                  <textarea className="w-full h-32 bg-surface-raised border border-border rounded-lg p-4 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="Tell the world about yourself..." />
                </div>

                <Button className="h-12 px-8 uppercase tracking-widest text-[10px] font-bold">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
