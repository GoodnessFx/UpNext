"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label } from "@upnext/ui"
import { CreditCard, Wallet, Apple, Smartphone, ArrowRight, ShieldCheck, Info, CheckCircle2, Loader2, FileText, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function InvestmentFlowPage() {
  const searchParams = useSearchParams()
  const initialAmount = searchParams.get("amount") || "100"
  
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState<"card" | "crypto" | "apple" | "bank">("card")
  const [amount, setAmount] = useState(initialAmount)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const platformFee = parseFloat(amount) * 0.005
  const insuranceFee = parseFloat(amount) * 0.02
  const totalDue = parseFloat(amount) + platformFee + insuranceFee

  const handleConfirm = () => {
    if (!agreed) return
    setIsProcessing(true)
    
    // Simulate payment processing & blockchain verification
    setTimeout(() => {
      storageService.saveUserAction("INVESTMENT", {
        talent: "Chioma Music",
        amount: parseFloat(amount),
        method: method,
        txHash: "0x842...f77"
      })
      setIsProcessing(false)
      setIsConfirmed(true)
      setStep(3)
    }, 3000)
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background text-text-primary flex items-center justify-center p-4">
        <Navigation />
        <Card className="max-w-md w-full bg-surface border-green/20 shadow-2xl overflow-hidden">
          <div className="h-2 bg-green shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
          <CardContent className="p-12 text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green animate-in zoom-in duration-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">Investment Verified</h2>
              <p className="text-text-secondary font-body uppercase tracking-widest text-xs">Transaction Hash: 0x842...f77</p>
            </div>
            
            <div className="p-6 bg-surface-raised rounded-xl border border-border text-left space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted">Asset</span>
                <span className="text-sm font-heading font-bold">CHIOMA.MUS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted">Amount</span>
                <span className="text-sm font-numbers font-bold">${amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted">Status</span>
                <Badge className="bg-green/15 text-green border-none text-[8px]">MINTED ON POLYGON</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button asChild className="h-14 uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-accent/20">
                <a href="/dashboard/investor">Go to Portfolio</a>
              </Button>
              <Button variant="outline" className="h-14 uppercase tracking-widest text-[10px] font-bold border-accent/20 text-accent">
                Download Proof (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-32 pb-16 px-4 max-w-6xl mx-auto">
        <div className="mb-16 text-center space-y-4">
          <Badge className="bg-accent/10 text-accent border-accent/20 uppercase tracking-[0.2em] px-4 py-1">Secure Checkout</Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tighter">Invest in Chioma Music</h1>
          <p className="text-text-secondary font-body uppercase tracking-widest text-sm max-w-xl mx-auto">Secure fractional shares in future career earnings via Polygon Smart Contracts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {/* Step 1: Payment Method */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-lg">1</div>
                <h2 className="text-2xl font-heading font-bold uppercase tracking-tight">Select Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex", tag: "Stripe" },
                  { id: "crypto", label: "Crypto Wallet", icon: Wallet, desc: "USDT, MATIC, ETH", tag: "Polygon" },
                  { id: "apple", label: "Apple Pay", icon: Apple, desc: "One-click secure", tag: "Mobile" },
                  { id: "bank", label: "Bank Transfer", icon: Smartphone, desc: "Direct Paystack/Flutterwave", tag: "Nigeria" },
                ].map((m) => (
                  <button 
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all relative group overflow-hidden",
                      method === m.id ? "border-accent bg-accent/5 shadow-xl" : "border-border bg-surface-raised hover:border-accent/30"
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <m.icon className={cn("w-8 h-8", method === m.id ? "text-accent" : "text-text-muted")} />
                      <Badge variant="outline" className="text-[8px] uppercase border-border">{m.tag}</Badge>
                    </div>
                    <h4 className="font-heading font-bold uppercase text-lg mb-1 group-hover:text-accent transition-colors">{m.label}</h4>
                    <p className="text-[10px] text-text-muted uppercase tracking-widest leading-relaxed">{m.desc}</p>
                    {method === m.id && (
                      <div className="absolute top-0 right-0 w-12 h-12 bg-accent/10 rounded-bl-3xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Verification & Proof */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-lg">2</div>
                <h2 className="text-2xl font-heading font-bold uppercase tracking-tight">Verification & Proof</h2>
              </div>
              <Card className="bg-surface border-border overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start gap-6 p-6 bg-surface-raised rounded-xl border border-border group hover:border-accent/30 transition-all cursor-pointer" onClick={() => setAgreed(!agreed)}>
                    <div className={cn(
                      "w-6 h-6 rounded border-2 mt-1 transition-all flex items-center justify-center",
                      agreed ? "bg-accent border-accent" : "border-border bg-transparent"
                    )}>
                      {agreed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-heading font-bold uppercase text-sm">Income Sharing Agreement (ISA)</h4>
                      <p className="text-[10px] text-text-secondary leading-relaxed uppercase tracking-widest">
                        I hereby agree to the terms of the ISA which legally entitles me to 0.125% of the Talent's future verified earnings for 10 years. I understand the risks involved in talent investment.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-accent text-[8px] uppercase font-bold gap-1">
                        <FileText className="w-3 h-3" /> Read Full Agreement
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green/5 border border-green/20 rounded-lg flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-green shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-green uppercase tracking-widest">Oracle Verified</p>
                        <p className="text-[8px] text-text-secondary leading-relaxed uppercase">Real-time earnings tracking via Spotify & YouTube API.</p>
                      </div>
                    </div>
                    <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg flex gap-4">
                      <Lock className="w-6 h-6 text-accent shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Escrow Protected</p>
                        <p className="text-[8px] text-text-secondary leading-relaxed uppercase">Funds are locked in smart contracts until goal is reached.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 border-accent shadow-[0_0_50px_rgba(255,107,0,0.1)] bg-surface overflow-hidden">
              <div className="h-1 bg-accent" />
              <CardHeader className="pb-6 border-b border-border p-8">
                <CardTitle className="text-2xl uppercase tracking-tighter">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Investment</span>
                    <span className="font-numbers font-bold text-xl">${parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Shares</span>
                    <span className="font-numbers font-bold text-accent text-xl">0.125%</span>
                  </div>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-text-muted">
                      <span>Platform Fee (0.5%)</span>
                      <span>${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-text-muted">
                      <span>Insurance Fund (2%)</span>
                      <span>${insuranceFee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-heading font-bold uppercase tracking-tight">Total Due</span>
                    <span className="text-4xl font-numbers font-bold text-text-primary">${totalDue.toLocaleString()}</span>
                  </div>
                  <p className="text-[8px] text-text-muted text-center uppercase tracking-[0.2em] font-bold">Includes gasless network fees</p>
                </div>

                <Button 
                  disabled={!agreed || isProcessing}
                  onClick={handleConfirm}
                  className={cn(
                    "w-full h-16 text-lg uppercase tracking-widest font-bold group relative overflow-hidden",
                    agreed ? "bg-accent hover:bg-accent/90" : "bg-border text-text-muted"
                  )}
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Confirm Investment
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-[8px] text-text-muted uppercase tracking-widest font-bold">Transaction will be recorded on</p>
                  <div className="flex justify-center items-center gap-2 opacity-50">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold">POLYGON MAINNET</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
