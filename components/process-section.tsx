"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, BookOpen, Shirt, Plane, CloudSun, PartyPopper } from "lucide-react"

const steps = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Termin buchen",
    description: "Wähle deinen Wunschtermin online oder ruf uns an. Flexible Terminplanung, auch kurzfristig möglich.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Einweisung",
    description: "Vor Ort erhältst du eine gründliche theoretische Einweisung. Dein Instruktor erklärt dir alles Schritt für Schritt.",
  },
  {
    icon: <Shirt className="w-6 h-6" />,
    title: "Ausrüstung",
    description: "Wir statten dich mit professioneller Ausrüstung aus - Overall, Brille und Gurtzeug. Alles nach höchsten Sicherheitsstandards.",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Aufstieg",
    description: "In ca. 15 Minuten geht es hoch auf 4.000 Meter. Genieße den Blick und die Vorfreude auf den Sprung.",
  },
  {
    icon: <CloudSun className="w-6 h-6" />,
    title: "Der Sprung",
    description: "60 Sekunden Freifall, gefolgt von 5-7 Minuten sanftem Gleiten unter dem Fallschirm. Der Moment deines Lebens!",
  },
  {
    icon: <PartyPopper className="w-6 h-6" />,
    title: "Feiern",
    description: "Nach der Landung erhältst du dein Sprungzertifikat. Feiere deinen Erfolg - du hast etwas Außergewöhnliches geschafft!",
  },
]

export function ProcessSection() {
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
    <section id="ablauf" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headingRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            So funktioniert{"'"}s
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Von der Buchung
            <br />
            <span className="text-primary">zum Sprung</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative bg-card border border-border rounded-2xl p-8 transition-all duration-700 hover:border-primary/40 hover:bg-card/80 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Step Number */}
      <span className="absolute top-6 right-6 text-6xl font-bold text-secondary/50 font-mono leading-none">
        {index + 1}
      </span>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          {step.icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  )
}
