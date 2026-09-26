import Link from "next/link"
import type { Settings } from "@/lib/content"

export function SiteFooter({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/images/logo.png" alt="" />
              <strong>{settings.orgName}</strong>
            </div>
            <p>{settings.tagline}</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="/#mission">Mission &amp; vision</a>
              </li>
              <li>
                <a href="/#domaines">Domaines d&apos;intervention</a>
              </li>
              <li>
                <a href="/#equipe">Notre équipe</a>
              </li>
              <li>
                <a href="/#actualites">Actualités</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>{settings.city}</li>
              <li>{settings.region}</li>
              {settings.email ? (
                <li>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              ) : null}
              {settings.phone ? <li>{settings.phone}</li> : null}
              <li>
                <Link href="/admin">Espace administration</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {settings.orgName}. Tous droits réservés.
          </span>
          <span>{settings.region}</span>
        </div>
      </div>
    </footer>
  )
}
