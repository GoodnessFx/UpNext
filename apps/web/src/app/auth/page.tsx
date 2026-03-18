"use client"

import React, { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@upnext/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@upnext/ui"
import { Input } from "@upnext/ui"
import { Label } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { Navigation } from "@/components/navigation"
import { Mail, Wallet } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { useRouter } from "next/navigation"

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "signin"

  const handleSignIn = () => {
    // Simulate auth logic
    alert("Authenticating securely via UpNext Shield...")
    setTimeout(() => {
      router.push("/dashboard/investor")
    }, 1000)
  }

  const handleSignUp = () => {
    alert("Creating secure account...")
    setTimeout(() => {
      router.push("/onboarding")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 text-xs font-ui capitalize tracking-normal">Forgot password?</Button>
                </div>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignIn}>Sign In</Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-surface px-2 text-text-muted">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full">
                <Button variant="outline" className="w-full h-12">G</Button>
                <Button variant="outline" className="w-full h-12">X</Button>
                <Button variant="outline" className="w-full h-12">A</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Start your journey on the Talent Stock Market.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
                <div className="h-1 w-full bg-border rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-green w-1/4" />
                </div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Strength: Weak</p>
              </div>
              <div className="space-y-2">
                <Label>I am a...</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col gap-1 border-accent">
                    <span className="font-bold text-xs">Investor</span>
                    <span className="text-[10px] text-text-muted capitalize">Buy shares</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <span className="font-bold text-xs">Talent</span>
                    <span className="text-[10px] text-text-muted capitalize">Raise capital</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSignUp}>Create Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Web3 Identity</CardTitle>
              <CardDescription>Connect your wallet to sign in with Ethereum.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10 text-accent" />
              </div>
              <p className="text-center text-text-secondary font-body mb-8">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
              <Button className="w-full h-12 gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </CardContent>
            <CardFooter className="bg-surface-raised rounded-b-card border-t border-border p-6">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="w-2 h-2 rounded-full bg-green" />
                <span className="font-mono">SIWE v2 Secure Protocol</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navigation />
      
      <main className="flex items-center justify-center pt-32 pb-16 px-4">
        <Suspense fallback={<div className="text-text-muted">Loading authentication...</div>}>
          <AuthContent />
        </Suspense>
      </main>
    </div>
  )
}
