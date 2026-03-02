"use client"

import { useEffect, useState, useRef } from "react"

interface ParallaxDividerProps {
  image: string
  alt: string
  text: string
  subtext?: string
}

export function ParallaxDivider({ image, alt, text, subtext }: ParallaxDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height)
        setOffset(progress * 100 - 50)
        setIsVisible(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center"
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-[130%] object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
      <div className="absolute inset-0 bg-background/60" />
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
          {text}
        </h3>
        {subtext && (
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {subtext}
          </p>
        )}
      </div>
    </div>
  )
}
