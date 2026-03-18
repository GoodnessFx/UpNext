"use client"

import React from "react"
import { Badge } from "@upnext/ui"
import { Button } from "@upnext/ui"
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react"

export type KYCTier = 0 | 1 | 2 | 3

interface KYCStatusProps {
  tier: KYCTier
  status: "pending" | "approved" | "rejected" | "none"
}

export function KYCStatus({ tier, status }: KYCStatusProps) {
  const getTierInfo = (t: KYCTier) => {
    switch (t) {
      case 0: return { label: "Tier 0", limit: "Browse only" }
      case 1: return { label: "Tier 1", limit: "Invest up to $1k" }
      case 2: return { label: "Tier 2", limit: "Invest up to $10k" }
      case 3: return { label: "Tier 3", limit: "Unlimited" }
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "approved":
        return <Badge variant="success" className="gap-1"><ShieldCheck className="w-3 h-3" /> Verified</Badge>
      case "pending":
        return <Badge variant="warning" className="gap-1"><Shield className="w-3 h-3" /> Pending</Badge>
      case "rejected":
        return <Badge variant="danger" className="gap-1"><ShieldAlert className="w-3 h-3" /> Action Required</Badge>
      default:
        return <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Unverified</Badge>
    }
  }

  const info = getTierInfo(tier)

  return (
    <div className="flex items-center justify-between p-4 bg-surface-raised border border-border rounded-card">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-accent" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-bold text-sm">{info.label}</span>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-text-muted capitalize">{info.limit}</p>
        </div>
      </div>
      
      {status !== "approved" && (
        <Button size="sm" variant="outline">Upgrade</Button>
      )}
    </div>
  )
}
