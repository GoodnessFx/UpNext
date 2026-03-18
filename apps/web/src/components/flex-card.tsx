import React from "react"
import { Badge, Button } from "@upnext/ui"
import { Share2, Download, TrendingUp, Award } from "lucide-react"

export function InvestorFlexCard({ talentName, initialFollowers, currentFollowers, investment, currentValue }: any) {
  const multiplier = (currentValue / investment).toFixed(1)
  
  return (
    <div className="w-full max-w-md bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
      <div className="aspect-square relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-alt to-gold opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1 border border-white/20">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Early Backer</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-4xl font-heading font-bold text-white leading-none">
              I BACKED <br />
              <span className="text-accent">{talentName.toUpperCase()}</span>
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-white/70 font-ui uppercase tracking-widest">When she had {initialFollowers} followers</p>
              <p className="text-sm text-white/70 font-ui uppercase tracking-widest">She has {currentFollowers} now</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">My ${investment} is now worth</p>
                <p className="text-4xl font-numbers font-bold text-white">${currentValue.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-numbers font-bold text-green">+{multiplier}x</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest">Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-surface flex gap-4">
        <Button className="flex-1 gap-2 uppercase tracking-widest text-[10px] font-bold h-12">
          <Share2 className="w-4 h-4" />
          Share to Stories
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
