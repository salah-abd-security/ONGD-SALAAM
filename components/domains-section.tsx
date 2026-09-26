import type { Domain } from "@/lib/content"
import { Icon } from "./icons"

export function DomainsSection({ domains }: { domains: Domain[] }) {
  return (
    <section id="domaines" className="section section-muted">
      <div className="container">
        <span className="eyebrow">Ce que nous faisons</span>
        <h2 className="section-title">Nos domaines d&apos;intervention</h2>
        <p className="section-lead">
          Nos actions s&apos;organisent autour de plusieurs axes complémentaires, au service de la paix et du
          développement durable des communautés.
        </p>
        <div className="cards-grid">
          {domains.map((d) => (
            <article key={d.id} className="domain-card">
              <div className="domain-icon">
                <Icon name={d.icon} />
              </div>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
