"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Brauche ich Erfahrung für einen Tandemsprung?",
    answer:
      "Nein, absolut nicht! Beim Tandemsprung bist du fest mit einem erfahrenen Instruktor verbunden, der den gesamten Sprung steuert. Du brauchst nur Mut und gute Laune. Wir erklären dir vor Ort alles, was du wissen musst.",
  },
  {
    question: "Wie alt muss ich sein und gibt es ein Gewichtslimit?",
    answer:
      "Du musst mindestens 16 Jahre alt sein (mit Einverständnis der Eltern). Das maximale Körpergewicht liegt bei 100 kg. Es gibt keine Altersobergrenze - solange du gesund bist, kannst du springen!",
  },
  {
    question: "Was passiert bei schlechtem Wetter?",
    answer:
      "Sicherheit geht vor! Bei Regen, starkem Wind oder schlechter Sicht verschieben wir den Sprung kostenlos auf einen neuen Termin. Du erhältst automatisch einen Ersatztermin nach deiner Wahl.",
  },
  {
    question: "Wie lange dauert der gesamte Aufenthalt?",
    answer:
      "Plane ca. 3-4 Stunden ein. Das beinhaltet die Einweisung (30 Min), Ausrüstung (15 Min), Aufstieg im Flugzeug (15 Min), den Sprung mit Gleiten (ca. 7 Min) und die anschließende Feier!",
  },
  {
    question: "Ist Fallschirmspringen gefährlich?",
    answer:
      "Tandemspringen gehört zu den sichersten Extremsportarten. Unsere Instruktoren haben jeweils über 3.000 Sprünge absolviert. Die Ausrüstung wird täglich geprüft und jeder Fallschirm hat einen automatischen Öffnungsmechanismus als Backup.",
  },
  {
    question: "Kann ich Gutscheine verschenken?",
    answer:
      "Ja! Gutscheine sind eines unserer beliebtesten Produkte. Du erhältst einen personalisierten Gutschein direkt nach der Buchung. Gutscheine sind 3 Jahre gültig und können für jedes Paket eingelöst werden.",
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
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
      className={`border-b border-border transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300 pr-8">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-60 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed pr-12">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQSection() {
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
    <section id="faq" className="relative py-32 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Häufige Fragen
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Alles was du
            <br />
            <span className="text-primary">wissen musst</span>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
