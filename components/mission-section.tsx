import type { Settings } from "@/lib/content"

export function MissionSection({ settings }: { settings: Settings }) {
  const values = settings.values
    .split(/[•|,]/)
    .map((v) => v.trim())
    .filter(Boolean)

  return (
    <section id="mission" className="section">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-media">
            <img src="/images/office-activity.png" alt="L'équipe de l'ONGD SALAAM au travail" />
          </div>
          <div>
            <span className="eyebrow">Qui sommes-nous</span>
            <h2 className="section-title">Notre mission</h2>
            <p className="section-lead">{settings.mission}</p>
            <div className="value-cards">
              <div className="value-card">
                <h4>Notre vision</h4>
                <p>{settings.vision}</p>
              </div>
              <div className="value-card">
                <h4>Nos valeurs</h4>
                <ul className="pill-list">
                  {values.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
