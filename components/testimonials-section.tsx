"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    location: "München",
    text: "Der absolut krasseste Moment meines Lebens! Das Team war super professionell und hat mir jede Angst genommen. Ich kann es kaum erwarten, wieder zu springen!",
    rating: 5,
  },
  {
    name: "Thomas K.",
    location: "Berlin",
    text: "Als Geburtstagsgeschenk gebucht und es war die beste Entscheidung ever. Die Videoaufnahmen sind der Hammer - habe sie bestimmt schon 100 Mal angeschaut!",
    rating: 5,
  },
  {
    name: "Lisa & Max",
    location: "Hamburg",
    text: "Wir haben als Paar zusammen gesprungen und es war magisch. Erst das Adrenalin, dann die unglaubliche Ruhe beim Gleiten. Absolut empfehlenswert!",
    rating: 5,
  },
  {
    name: "Andreas W.",
    location: "Frankfurt",
    text: "Ich hatte echt Angst, aber der Instruktor war so ruhig und professionell. Beim Freifall war dann alles vergessen - nur noch pure Euphorie!",
    rating: 5,
  },
  {
    name: "Julia S.",
    location: "Köln",
    text: "Zum 30. Geburtstag meinen Tandemsprung gemacht. Der Panoramablick unter dem Schirm war atemberaubend. Bestes Geschenk, das ich mir je gemacht habe!",
    rating: 5,
  },
  {
    name: "Marco R.",
    location: "Stuttgart",
    text: "Schon zum dritten Mal hier und es wird nie langweilig. Diesmal mit dem Ultimate Paket - der Cinematic Edit ist einfach Weltklasse!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true)
      },
      { threshold: 0.3 }
    )
    if (headingRef.current) observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-scroll testimonials
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.5

    const animate = () => {
      scrollPos += speed
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0
      }
      el.scrollLeft = scrollPos
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const pause = () => cancelAnimationFrame(animationId)
    const resume = () => { animationId = requestAnimationFrame(animate) }

    el.addEventListener("mouseenter", pause)
    el.addEventListener("mouseleave", resume)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resume)
    }
  }, [])

  return (
    <section id="team" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Erfahrungen
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Was unsere
            <br />
            <span className="text-primary">Springer sagen</span>
          </h2>
        </div>
      </div>

      {/* Scrolling Testimonials */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: "auto" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="min-w-[340px] max-w-[340px] bg-card border border-border rounded-2xl p-8 shrink-0 hover:border-primary/30 transition-colors duration-300"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <p className="text-foreground leading-relaxed mb-6 text-sm">
              {t.text}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
