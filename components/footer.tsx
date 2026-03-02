import { ArrowUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
                  <path
                    d="M20 5 L12 30 L20 24 L28 30 Z"
                    fill="currentColor"
                    className="text-primary-foreground"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-widest text-foreground">
                SKYFALL
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dein Anbieter für unvergessliche Tandem-Fallschirmsprünge im Allgäu. Seit 2010.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Sprünge
            </h4>
            <ul className="flex flex-col gap-2">
              {["Tandemsprung", "Geschenkgutschein", "Gruppenangebote", "Videoproduktion"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Infos
            </h4>
            <ul className="flex flex-col gap-2">
              {["Über uns", "Sicherheit", "FAQ", "Anfahrt"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-2">
              {["Impressum", "Datenschutz", "AGB", "Widerrufsrecht"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {'© 2026 SKYFALL Tandem. Alle Rechte vorbehalten.'}
          </p>
          <a
            href="#hero"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
          >
            Nach oben
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  )
}
