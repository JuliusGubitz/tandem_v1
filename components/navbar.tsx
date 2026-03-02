"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { href: "#erlebnis", label: "Erlebnis" },
  { href: "#pakete", label: "Pakete" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
              <path
                d="M20 5 L12 30 L20 24 L28 30 Z"
                fill="currentColor"
                className="text-primary-foreground"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-widest text-foreground">
            SKYFALL
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#buchen"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform duration-300"
          style={{ animation: "pulse-glow 3s infinite" }}
        >
          Jetzt Buchen
          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buchen"
            onClick={() => setMobileOpen(false)}
            className="mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-center text-sm font-bold uppercase tracking-wider"
          >
            Jetzt Buchen
          </a>
        </div>
      </div>
    </nav>
  )
}
