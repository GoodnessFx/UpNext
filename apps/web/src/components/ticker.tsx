"use client"

import React from "react"
import { cn } from "@upnext/ui"

interface TickerItem {
  symbol?: string
  change?: number
  type?: "stock" | "social"
  user?: string
  amount?: number
  time?: string
}

const items: TickerItem[] = [
  { symbol: "CHIOMA.MUS", change: 12.4, type: "stock" },
  { user: "Emeka from Lagos", amount: 200, time: "3m ago", type: "social" },
  { symbol: "FEMI.SPT", change: -2.1, type: "stock" },
  { user: "Tunde from Abuja", amount: 500, time: "12m ago", type: "social" },
  { symbol: "JADE.ART", change: 45.2, type: "stock" },
  { user: "Chioma from London", amount: 1000, time: "1h ago", type: "social" },
  { symbol: "LEKAN.DEV", change: 8.7, type: "stock" },
  { symbol: "ZAINAB.MOD", change: 15.3, type: "stock" },
]

export function LiveTicker() {
  return (
    <div className="w-full bg-surface border-y border-border py-3 overflow-hidden select-none">
      <div className="flex animate-scroll whitespace-nowrap gap-12 items-center">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 font-mono text-sm tracking-tighter">
            {item.type === "stock" ? (
              <>
                <span className="text-text-primary font-bold uppercase">{item.symbol}</span>
                <span className={cn(
                  "font-bold",
                  (item.change || 0) >= 0 ? "text-green" : "text-red"
                )}>
                  {(item.change || 0) >= 0 ? "+" : ""}{item.change}%
                </span>
              </>
            ) : (
              <>
                <span className="text-accent font-bold uppercase">{item.user}</span>
                <span className="text-text-secondary font-medium">just invested</span>
                <span className="text-green font-bold">${item.amount}</span>
                <span className="text-text-muted text-[10px] ml-1 uppercase">{item.time}</span>
              </>
            )}
            <span className="text-border mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
