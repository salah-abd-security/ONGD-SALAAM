import type { Settings } from "@/lib/content"
import { Icon } from "./icons"

export function Hero({ settings }: { settings: Settings }) {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-inner">
          <div>
            <span className="hero-badge">
              <Icon name="pin" /> {settings.city} — {settings.region.split(",")[0]}
            </span>
            <h1>{settings.heroTitle}</h1>
            <p>{settings.heroSubtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-accent" href="#mission">
                Découvrir notre mission
              </a>
              <a className="btn btn-ghost" href="#contact" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                Nous contacter <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img src="/images/hero.png" alt="Membres de la communauté du Nord-Ubangi réunis" />
          </div>
        </div>
      </div>
    </section>
  )
}
