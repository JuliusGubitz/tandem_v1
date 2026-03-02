"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Star, Camera, Video, Zap } from "lucide-react"

interface Package {
  name: string
  price: string
  description: string
  features: string[]
  icon: React.ReactNode
  popular?: boolean
}

const packages: Package[] = [
  {
    name: "Solo Jump",
    price: "199",
    description: "Der pure Sprung. Du und der freie Fall.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Tandem-Sprung aus 4.000m",
      "Professioneller Instruktor",
      "Komplette Ausrüstung",
      "Theoretische Einweisung",
      "Sprungzertifikat",
    ],
  },
  {
    name: "Hero Package",
    price: "299",
    description: "Dein Sprung, festgehalten für die Ewigkeit.",
    icon: <Camera className="w-6 h-6" />,
    popular: true,
    features: [
      "Alles aus Solo Jump",
      "Handkamera-Video",
      "Professionelle Fotos",
      "Digitaler Download",
      "Social Media Highlight-Reel",
      "Persönlicher Fotografenflug",
    ],
  },
  {
    name: "Ultimate",
    price: "449",
    description: "Das volle Programm. Kein Kompromiss.",
    icon: <Video className="w-6 h-6" />,
    features: [
      "Alles aus Hero Package",
      "Außenkamera + Handkamera",
      "Cinematic Edit",
      "VIP Lounge Zugang",
      "Frühstück & Getränke",
      "2. Sprung -50% Gutschein",
    ],
  },
]

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl p-px transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${pkg.popular ? "scale-105 md:scale-110 z-10" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Gradient Border for Popular */}
      {pkg.popular && (
        <div className="absolute -inset-px rounded-2xl bg-primary/30" />
      )}

      <div
        className={`relative rounded-2xl p-8 h-full flex flex-col ${
          pkg.popular ? "bg-card border border-primary/40" : "bg-card border border-border"
        }`}
      >
        {pkg.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Beliebteste Wahl
          </div>
        )}

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
          pkg.popular ? "bg-primary/20 text-primary" : "bg-secondary text-foreground"
        }`}>
          {pkg.icon}
        </div>

        <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
        <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>

        <div className="mt-6 mb-8">
          <span className="text-5xl font-bold text-foreground">{pkg.price}</span>
          <span className="text-muted-foreground ml-1">EUR</span>
        </div>

        <ul className="flex-1 flex flex-col gap-3 mb-8">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className={`w-5 h-5 mt-0.5 shrink-0 ${
                pkg.popular ? "text-primary" : "text-muted-foreground"
              }`} />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#buchen"
          className={`w-full text-center py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
            pkg.popular
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Paket wählen
        </a>
      </div>
    </div>
  )
}

export function PricingSection() {
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
    <section id="pakete" className="relative py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headingRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Pakete & Preise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Wähle dein
            <br />
            <span className="text-primary">Abenteuer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-stretch">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
