import type { NewsPost } from "@/lib/content"

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return ""
  }
}

export function NewsSection({ news }: { news: NewsPost[] }) {
  if (!news.length) return null
  return (
    <section id="actualites" className="section section-muted">
      <div className="container">
        <span className="eyebrow">Actualités</span>
        <h2 className="section-title">Nos dernières actions</h2>
        <p className="section-lead">
          Suivez l&apos;actualité de nos projets et de nos activités sur le terrain.
        </p>
        <div className="news-grid">
          {news.map((n) => (
            <article key={n.id} className="news-card">
              {n.imageUrl ? <img src={n.imageUrl || "/placeholder.svg"} alt={n.title} /> : null}
              <div className="news-body">
                <span className="news-date">{formatDate(n.date)}</span>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
