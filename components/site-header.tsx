import Link from "next/link"
import type { Settings } from "@/lib/content"

export function SiteHeader({ settings }: { settings: Settings }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" aria-label={`${settings.orgName} — accueil`}>
          <img src="/images/logo.png" alt="" />
          <span>
            <span className="brand-name">{settings.orgName}</span>
            <span className="brand-sub">Paix &amp; Développement</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          <a href="/#mission">Mission</a>
          <a href="/#domaines">Domaines</a>
          <a href="/#equipe">Équipe</a>
          <a href="/#actualites">Actualités</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-primary" href="/#contact">
            Nous soutenir
          </a>
        </div>
      </div>
    </header>
  )
}
