import React from "react"
import { CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@upnext/ui"

export function VerifiedBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center text-green cursor-help">
            <CheckCircle2 className="w-5 h-5 fill-green/10" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-surface border-border text-text-primary p-3 max-w-xs">
          <p className="text-xs font-heading font-bold uppercase tracking-widest mb-1 text-green">Verified Earnings Badge</p>
          <p className="text-[10px] text-text-secondary leading-relaxed uppercase tracking-wider">
            This talent's earnings have been verified by the UpNext Oracle via direct API integration with Spotify, YouTube, and Apple Music.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
