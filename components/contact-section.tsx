import type { Settings } from "@/lib/content"
import { Icon } from "./icons"

export function ContactSection({ settings }: { settings: Settings }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Entrons en relation</h2>
            <p className="section-lead">
              Vous souhaitez soutenir nos actions, devenir partenaire ou en savoir plus sur nos projets ?
              N&apos;hésitez pas à nous contacter.
            </p>
            <ul className="contact-list">
              <li>
                <span className="ci">
                  <Icon name="pin" />
                </span>
                <span>
                  <strong>Adresse</strong>
                  {settings.address}, {settings.region}
                </span>
              </li>
              {settings.email ? (
                <li>
                  <span className="ci">
                    <Icon name="mail" />
                  </span>
                  <span>
                    <strong>Email</strong>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </span>
                </li>
              ) : null}
              {settings.phone ? (
                <li>
                  <span className="ci">
                    <Icon name="phone" />
                  </span>
                  <span>
                    <strong>Téléphone</strong>
                    {settings.phone}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="contact-card">
            <h3>Suivez-nous</h3>
            <p>Rejoignez notre communauté et restez informé de nos dernières actions sur le terrain.</p>
            <div className="social-row">
              {settings.whatsapp ? (
                <a className="btn btn-accent" href={settings.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" /> Chaîne WhatsApp
                </a>
              ) : null}
              {settings.linkedin ? (
                <a
                  className="btn btn-ghost"
                  style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="linkedin" /> LinkedIn
                </a>
              ) : null}
            </div>
            {!settings.whatsapp && !settings.linkedin ? (
              <p style={{ opacity: 0.85, marginTop: "1rem", marginBottom: 0 }}>
                Les liens vers nos réseaux (chaîne WhatsApp, LinkedIn) seront ajoutés prochainement.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
