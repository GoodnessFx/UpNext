"use client"

import React, { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@upnext/ui"
import { Input } from "@upnext/ui"
import { Label } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { Badge } from "@upnext/ui"
import { 
  User, 
  Music, 
  Camera, 
  Video, 
  Link as LinkIcon, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  DollarSign
} from "lucide-react"

const steps = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Category", icon: Music },
  { id: 3, title: "Media", icon: Camera },
  { id: 4, title: "Campaign", icon: TrendingUp },
  { id: 5, title: "Review", icon: CheckCircle2 },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    stageName: "",
    category: "",
    amount: "20000",
    equity: "10",
    duration: "5",
  })

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center gap-2 transition-colors ${
                  currentStep >= step.id ? "text-accent" : "text-text-muted"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.id ? "border-accent bg-accent/10" : "border-border"
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-surface shadow-2xl border-border">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-3xl">Basic Info</CardTitle>
                <p className="text-text-secondary font-body">Tell us who you are and where you're from.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Legal Name</Label>
                    <Input id="full-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stage-name">Stage Name</Label>
                    <Input id="stage-name" placeholder="Johnny Rocks" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Nigeria" />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-3xl">Choose Category</CardTitle>
                <p className="text-text-secondary font-body">Which field describes your talent best?</p>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Music", "Sports", "Art", "Gaming", "Content", "Tech", "Fashion", "Comedy", "Writing"].map((cat) => (
                  <Button 
                    key={cat} 
                    variant="outline" 
                    className={`h-24 flex flex-col gap-2 ${formData.category === cat ? "border-accent bg-accent/5" : ""}`}
                    onClick={() => setFormData({ ...formData, category: cat })}
                  >
                    <span className="font-heading font-bold">{cat}</span>
                  </Button>
                ))}
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-3xl">Media & Portfolio</CardTitle>
                <p className="text-text-secondary font-body">Visuals matter. Upload your best work.</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-40 h-40 rounded-card bg-surface-raised border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 group hover:border-accent transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-text-muted group-hover:text-accent" />
                    <span className="text-[10px] font-bold uppercase text-text-muted group-hover:text-accent">Profile</span>
                  </div>
                  <div className="flex-1 h-40 rounded-card bg-surface-raised border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 group hover:border-accent transition-colors cursor-pointer">
                    <Video className="w-8 h-8 text-text-muted group-hover:text-accent" />
                    <span className="text-[10px] font-bold uppercase text-text-muted group-hover:text-accent">Video Pitch</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Social Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input className="pl-10" placeholder="Spotify URL" />
                    </div>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input className="pl-10" placeholder="Instagram URL" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle className="text-3xl">Campaign Details</CardTitle>
                <p className="text-text-secondary font-body">Set your funding goal and equity terms.</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Funding Goal ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input 
                        id="amount" 
                        type="number" 
                        className="pl-10 h-12 font-numbers" 
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equity">Equity Offered (%)</Label>
                    <Input 
                      id="equity" 
                      type="number" 
                      className="h-12 font-numbers" 
                      value={formData.equity}
                      onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="p-6 bg-accent/5 border border-accent/20 rounded-card space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-heading font-bold text-accent uppercase tracking-widest">Implied Valuation</h4>
                    <p className="text-2xl font-numbers font-bold text-text-primary">
                      ${(parseFloat(formData.amount) / (parseFloat(formData.equity) / 100) || 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-text-secondary font-body leading-relaxed">
                    Based on your goal and equity, your career is valued at the amount above. Investors will buy shares based on this valuation.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 5 && (
            <>
              <CardHeader>
                <CardTitle className="text-3xl">Review & Submit</CardTitle>
                <p className="text-text-secondary font-body">Almost there! Review your campaign details.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Identity</p>
                    <p className="font-heading font-bold text-lg">Johnny Rocks</p>
                    <p className="text-sm text-text-secondary font-ui uppercase">Music • Lagos, NG</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Terms</p>
                    <p className="font-numbers font-bold text-lg">${formData.amount} raising</p>
                    <p className="text-sm text-text-secondary font-ui uppercase">{formData.equity}% Equity offered</p>
                  </div>
                </div>
                <div className="p-6 bg-surface-raised rounded-card border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold mb-1">Ready for Review</h4>
                      <p className="text-xs text-text-secondary font-body">Our compliance team will review your application within 24 hours. Once approved, your campaign will go live.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between border-t border-border pt-6">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button 
              onClick={currentStep === steps.length ? () => {} : nextStep}
              className="gap-2 px-12"
            >
              {currentStep === steps.length ? "Submit Application" : "Next Step"}
              {currentStep !== steps.length && <ChevronRight className="w-4 h-4" />}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
