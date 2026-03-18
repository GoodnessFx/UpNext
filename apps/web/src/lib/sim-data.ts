"use client"

import { useState, useEffect } from 'react'

/**
 * Hook to simulate real-time data updates.
 * In a real app, this would use React Query, SWR, or WebSockets.
 */
export function useRealTimeData<T>(initialData: T, interval = 5000) {
  const [data, setData] = useState<T>(initialData)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSyncing(true)
      
      // Simulate network latency
      setTimeout(() => {
        setLastUpdated(new Date())
        setIsSyncing(false)
        
        // Randomly fluctuate numeric values if they exist
        if (typeof data === 'object' && data !== null) {
          const newData = { ...data } as any
          Object.keys(newData).forEach(key => {
            if (typeof newData[key] === 'number') {
              // 5% fluctuation
              const change = 1 + (Math.random() * 0.1 - 0.05)
              newData[key] = parseFloat((newData[key] * change).toFixed(2))
            }
          })
          setData(newData)
        }
      }, 800)
    }, interval)

    return () => clearInterval(timer)
  }, [data, interval])

  return { data, lastUpdated, isSyncing }
}

/**
 * Simulated storage service
 */
export const storageService = {
  saveUserAction: (action: string, metadata: any) => {
    const history = JSON.parse(localStorage.getItem('upnext_history') || '[]')
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      metadata,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('upnext_history', JSON.stringify([newEntry, ...history].slice(0, 50)))
    return newEntry
  },
  
  getHistory: () => {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('upnext_history') || '[]')
  }
}
