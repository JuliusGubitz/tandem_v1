"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5
  const textOpacity = Math.max(0, 1 - scrollY / 600)
  const textTranslate = scrollY * 0.3
  const scaleValue = 1 + scrollY * 0.0003

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] overflow-hidden"
      id="hero"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${scaleValue})`,
        }}
      >
        <img
          src="/images/hero-sky.jpg"
          alt="Blick aus einem Flugzeug in 4000 Metern Höhe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      {/* Wind Streaks Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${60 + Math.random() * 120}px`,
              animation: `windStreak ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Altitude Indicator */}
      <div
        className="absolute top-28 right-8 z-20 hidden md:flex flex-col items-center gap-2"
        style={{ opacity: textOpacity }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center relative">
          <div
            className="absolute w-6 h-px bg-primary origin-left"
            style={{
              animation: "altimeter-spin 8s linear infinite",
            }}
          />
          <span className="text-[10px] text-primary font-mono">ALT</span>
        </div>
        <div className="text-xs font-mono text-primary tracking-widest">
          4.000m
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslate}px)`,
        }}
      >
        <div className="mb-6 inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary tracking-wider">
            Saison 2026 - Jetzt Termine sichern
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-none text-balance">
          SPRING
          <br />
          <span className="text-primary">INS LEBEN</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
          Tandem-Fallschirmspringen aus 4.000 Metern.
          <br className="hidden sm:block" />
          60 Sekunden Freifall. Ein Leben lang Erinnerung.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#buchen"
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-bold uppercase tracking-wider hover:scale-105 transition-transform duration-300"
            style={{ animation: "pulse-glow 3s infinite" }}
          >
            Jetzt Springen
          </a>
          <a
            href="#erlebnis"
            className="border border-border text-foreground px-10 py-4 rounded-full text-lg font-medium uppercase tracking-wider hover:bg-secondary transition-colors duration-300"
          >
            Mehr erfahren
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "15.000+", label: "Sprünge" },
            { value: "4.000m", label: "Absprunghöhe" },
            { value: "200km/h", label: "Freifall-Speed" },
            { value: "100%", label: "Sicherheit" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Scroll zum Springen
        </span>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </div>
    </section>
  )
}
