import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { DiveExperience } from "@/components/dive-experience"
import { ParallaxDivider } from "@/components/parallax-divider"
import { PricingSection } from "@/components/pricing-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"
import { AltitudeTracker } from "@/components/altitude-tracker"
import { PasswordGate } from "@/components/password-gate"

export default function Home() {
  return (
    <PasswordGate>
    <main className="relative">
      <Navbar />
      <AltitudeTracker />
      <HeroSection />

      <DiveExperience />

      <ParallaxDivider
        image="/images/freefall.jpg"
        alt="Tandem Freifall Moment"
        text="Bereit für den Sprung deines Lebens?"
        subtext="200 km/h. 60 Sekunden. Unendliche Freiheit."
      />

      <PricingSection />

      <ProcessSection />

      <ParallaxDivider
        image="/images/parachute.jpg"
        alt="Fallschirm Gleitflug über die Landschaft"
        text="Unvergessliche Momente"
        subtext="Jeder Sprung ist eine Geschichte, die du für immer erzählen wirst."
      />

      <TestimonialsSection />

      <FAQSection />

      <BookingSection />

      <Footer />
    </main>
    </PasswordGate>
  )
}
