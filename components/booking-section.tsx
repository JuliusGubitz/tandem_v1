"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="buchen" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 block">
            Bereit?
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
            Buch deinen
            <br />
            <span className="text-primary">Sprung</span>
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Schnellanfrage
            </h3>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Max Mustermann"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="max@email.de"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-muted-foreground mb-2 block">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+49 123 456789"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="package" className="text-sm text-muted-foreground mb-2 block">
                  Paket
                </label>
                <select
                  id="package"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option>Solo Jump - 199 EUR</option>
                  <option>Hero Package - 299 EUR</option>
                  <option>Ultimate - 449 EUR</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="text-sm text-muted-foreground mb-2 block">
                  Wunschtermin
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                  Nachricht (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Gibt es etwas, das wir wissen sollten?"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2"
              >
                Anfrage senden
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Kontakt
              </h3>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Telefon",
                    value: "+49 (0) 123 456 7890",
                    href: "tel:+4901234567890",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "E-Mail",
                    value: "info@skyfall-tandem.de",
                    href: "mailto:info@skyfall-tandem.de",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Standort",
                    value: "Flugplatz Leutkirch, 88299 Leutkirch im Allgäu",
                    href: "#",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "Öffnungszeiten",
                    value: "März - Oktober: Mi-So, 9:00 - 18:00 Uhr",
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
              <h4 className="text-xl font-bold text-foreground mb-2">
                Das perfekte Geschenk
              </h4>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Überrasche deine Liebsten mit einem Gutschein für den ultimativen Adrenalinkick. 3 Jahre gültig.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform duration-300"
              >
                Gutschein kaufen
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
