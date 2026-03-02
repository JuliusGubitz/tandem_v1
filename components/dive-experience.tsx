"use client"

import { useEffect, useRef, useState } from "react"
import { Plane, Wind, CloudSun, MapPin } from "lucide-react"

interface Phase {
  icon: React.ReactNode
  altitude: string
  title: string
  description: string
  image: string
  color: string
}

const phases: Phase[] = [
  {
    icon: <Plane className="w-6 h-6" />,
    altitude: "4.000m",
    title: "Der Aufstieg",
    description:
      "Im Flugzeug steigt die Spannung mit jedem Meter. Du siehst die Welt unter dir kleiner werden. Dein Tandem-Instruktor checkt ein letztes Mal die Ausrüstung. Die Tür öffnet sich - Adrenalin pur.",
    image: "/images/plane-interior.jpg",
    color: "text-accent",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    altitude: "3.000m",
    title: "Der Freifall",
    description:
      "60 Sekunden pures Adrenalin! Mit bis zu 200 km/h rast du dem Boden entgegen. Der Wind brüllt, dein Herz rast. Ein Gefühl von absoluter Freiheit - unbeschreiblich und unvergesslich.",
    image: "/images/freefall.jpg",
    color: "text-primary",
  },
  {
    icon: <CloudSun className="w-6 h-6" />,
    altitude: "1.500m",
    title: "Die Schwerelosigkeit",
    description:
      "Der Fallschirm öffnet sich und plötzlich - Stille. Du gleitest sanft durch die Luft, genießt den atemberaubenden Panoramablick und lässt das eben Erlebte sacken. Purer Frieden.",
    image: "/images/parachute.jpg",
    color: "text-primary",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    altitude: "0m",
    title: "Die Landung",
    description:
      "Sanft setzt du auf dem Boden auf. Die Emotionen überwältigen dich - Jubel, Tränen, unbändige Freude. Du hast es geschafft! Diesen Moment wirst du nie vergessen.",
    image: "/images/landing-field.jpg",
    color: "text-primary",
  },
]

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative group">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
          <img
            src={phase.image}
            alt={phase.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
          {/* Altitude Badge */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <span className={`${phase.color}`}>{phase.icon}</span>
            <span className="text-sm font-mono font-bold text-foreground">
              {phase.altitude}
            </span>
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl md:text-7xl font-bold text-secondary/80 font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          {phase.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {phase.description}
        </p>
      </div>
    </div>
  )
}

export function DiveExperience() {
  const headingRef = useRef<HTMLDivElement>(null)
  const [headingVisible, setHeadingVisible] = useState(false)

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

  return (
    <section id="erlebnis" className="relative py-32 px-6">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <div
          ref={headingRef}
          className={`text-center mb-24 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Das Erlebnis
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Dein Sprung in
            <br />
            <span className="text-primary">4 Phasen</span>
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.title} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
