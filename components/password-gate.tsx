"use client"

import { useState, useRef, useEffect } from "react"
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react"

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("skyfall-unlocked")
      if (stored === "true") {
        setUnlocked(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!unlocked && inputRef.current) {
      inputRef.current.focus()
    }
  }, [unlocked])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "123") {
      setError(false)
      setTransitioning(true)
      sessionStorage.setItem("skyfall-unlocked", "true")
      setTimeout(() => {
        setUnlocked(true)
      }, 800)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-md">
        {/* Lock icon with pulse ring */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center backdrop-blur-sm">
            <Lock className="w-6 h-6 text-white/60" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-light tracking-[0.3em] text-white/90 uppercase">
            Skyfall
          </h1>
          <p className="text-sm tracking-widest text-white/30 uppercase">
            Zugang erforderlich
          </p>
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div
            className={`relative group ${shaking ? "animate-shake" : ""}`}
            style={
              shaking
                ? {
                    animation: "shake 0.5s ease-in-out",
                  }
                : undefined
            }
          >
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              className={`w-full bg-white/[0.04] border ${
                error ? "border-red-500/50" : "border-white/10 focus:border-white/30"
              } rounded-xl px-5 py-4 text-white/90 placeholder-white/20 text-center text-lg tracking-[0.2em] outline-none transition-all duration-300 backdrop-blur-sm`}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Error message */}
          <div className={`h-5 flex items-center justify-center transition-opacity duration-300 ${error ? "opacity-100" : "opacity-0"}`}>
            <p className="text-red-400/80 text-xs tracking-widest uppercase">
              Falsches Passwort
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full group relative overflow-hidden rounded-xl bg-white/[0.06] border border-white/10 hover:border-white/20 py-4 text-white/70 hover:text-white transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-sm tracking-[0.2em] uppercase">
              Eintreten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>

        {/* Bottom accent line */}
        <div className="w-12 h-px bg-white/10 mt-4" />
      </div>

      {/* Shake keyframes injected via style tag */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-6px); }
          30%, 70% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
