"use client"

import { useEffect, useState } from "react"

export function AltitudeTracker() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(Math.min(1, scrollTop / docHeight))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const altitude = Math.round(4000 * (1 - scrollPercent))
  const barHeight = scrollPercent * 100

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2">
      {/* Altitude number */}
      <div className="text-xs font-mono text-primary tracking-wider mb-2 writing-mode-vertical rotate-180"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {altitude.toLocaleString("de-DE")}m
      </div>

      {/* Track */}
      <div className="relative w-1 h-40 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-300"
          style={{ height: `${barHeight}%` }}
        />
      </div>

      {/* Markers */}
      <div className="flex flex-col gap-1 mt-1">
        {["4K", "3K", "1.5K", "0"].map((label, i) => (
          <span key={label} className="text-[8px] font-mono text-muted-foreground leading-none">
            {label}
          </span>
        ))}
      </div>

      {/* Skydiver icon that moves */}
      <div
        className="absolute w-6 h-6 -right-3 transition-all duration-300"
        style={{ top: `${10 + barHeight * 0.7}%` }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" aria-hidden="true">
          <circle cx="12" cy="4" r="3" fill="currentColor" />
          <path d="M6 12 L12 8 L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="8" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="18" x2="8" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="18" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
