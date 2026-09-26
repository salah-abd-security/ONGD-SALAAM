import type { TeamMember } from "@/lib/content"

export function TeamSection({ team }: { team: TeamMember[] }) {
  return (
    <section id="equipe" className="section">
      <div className="container">
        <span className="eyebrow">Notre équipe</span>
        <h2 className="section-title">Les femmes et les hommes de SALAAM</h2>
        <p className="section-lead">
          Une équipe engagée au service des communautés, portée par des valeurs de paix, d&apos;intégrité et de
          solidarité.
        </p>
        <div className="team-grid">
          {team.map((m) => (
            <article key={m.id} className="team-card">
              <img
                className="team-photo"
                src={m.photoUrl || "/images/office-activity.png"}
                alt={`Portrait de ${m.name}`}
              />
              <div className="team-body">
                <span className="team-role">{m.role}</span>
                <h3>{m.name}</h3>
                {m.bio ? <p className="team-bio">{m.bio}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
