import Link from "next/link"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { hasDatabase } from "@/lib/prisma"
import { getSettings, getTeam, getDomains, getNews } from "@/lib/content"
import {
  logoutAction,
  saveSettingsAction,
  saveTeamMemberAction,
  deleteTeamMemberAction,
  saveDomainAction,
  deleteDomainAction,
  saveNewsAction,
  deleteNewsAction,
} from "./actions"

export const dynamic = "force-dynamic"

const ICON_OPTIONS = ["peace", "community", "education", "health", "leaf", "empower"]

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login")

  const [settings, team, domains, news] = await Promise.all([
    getSettings(),
    getTeam(),
    getDomains(),
    getNews(false),
  ])

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container">
          <div className="brand" style={{ color: "#fff" }}>
            <img src="/images/logo.png" alt="" style={{ width: 34, height: 34 }} />
            <strong>Administration — ONGD SALAAM</strong>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="/" target="_blank">
              Voir le site
            </Link>
            <form action={logoutAction} className="inline-form">
              <button className="btn btn-ghost btn-sm" type="submit" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="admin-main">
        {!hasDatabase ? (
          <div className="notice notice-info">
            Base de données non connectée dans cet environnement : les contenus affichés sont ceux de
            démonstration et l&apos;enregistrement est désactivé. Sur le site déployé (avec{" "}
            <code>DATABASE_URL</code>), toutes les modifications sont enregistrées.
          </div>
        ) : (
          <div className="notice notice-success">
            Base de données connectée. Vos modifications sont enregistrées et visibles immédiatement sur le
            site public.
          </div>
        )}

        <nav className="admin-grid-links" aria-label="Sections d'administration">
          <a className="admin-nav-card" href="#settings">Informations générales</a>
          <a className="admin-nav-card" href="#team">Équipe</a>
          <a className="admin-nav-card" href="#domains">Domaines</a>
          <a className="admin-nav-card" href="#news">Actualités</a>
        </nav>

        {/* Settings */}
        <section id="settings" className="admin-card">
          <h2>Informations générales</h2>
          <form action={saveSettingsAction}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="orgName">Nom de l&apos;organisation</label>
                <input id="orgName" name="orgName" defaultValue={settings.orgName} required />
              </div>
              <div className="field">
                <label htmlFor="tagline">Slogan / sous-titre</label>
                <input id="tagline" name="tagline" defaultValue={settings.tagline} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="heroTitle">Titre principal (accueil)</label>
              <input id="heroTitle" name="heroTitle" defaultValue={settings.heroTitle} />
            </div>
            <div className="field">
              <label htmlFor="heroSubtitle">Texte d&apos;introduction (accueil)</label>
              <textarea id="heroSubtitle" name="heroSubtitle" defaultValue={settings.heroSubtitle} />
            </div>
            <div className="field">
              <label htmlFor="mission">Mission</label>
              <textarea id="mission" name="mission" defaultValue={settings.mission} />
            </div>
            <div className="field">
              <label htmlFor="vision">Vision</label>
              <textarea id="vision" name="vision" defaultValue={settings.vision} />
            </div>
            <div className="field">
              <label htmlFor="values">Valeurs (séparées par des •)</label>
              <input id="values" name="values" defaultValue={settings.values} />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="address">Adresse</label>
                <input id="address" name="address" defaultValue={settings.address} />
              </div>
              <div className="field">
                <label htmlFor="city">Ville</label>
                <input id="city" name="city" defaultValue={settings.city} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="region">Région / pays</label>
              <input id="region" name="region" defaultValue={settings.region} />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Téléphone</label>
                <input id="phone" name="phone" defaultValue={settings.phone} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" defaultValue={settings.email} />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="whatsapp">Lien chaîne WhatsApp</label>
                <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} placeholder="https://whatsapp.com/channel/…" />
              </div>
              <div className="field">
                <label htmlFor="linkedin">Lien LinkedIn</label>
                <input id="linkedin" name="linkedin" defaultValue={settings.linkedin} placeholder="https://linkedin.com/company/…" />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={!hasDatabase}>
              Enregistrer les informations
            </button>
          </form>
        </section>

        {/* Team */}
        <section id="team" className="admin-card">
          <h2>Équipe ({team.length})</h2>
          {team.map((m) => (
            <div key={m.id} className="admin-item">
              <div className="admin-item-head">
                <strong>{m.name}</strong>
                <form action={deleteTeamMemberAction} className="inline-form">
                  <input type="hidden" name="id" value={m.id} />
                  <button className="btn btn-danger btn-sm" type="submit" disabled={!hasDatabase}>
                    Supprimer
                  </button>
                </form>
              </div>
              <form action={saveTeamMemberAction}>
                <input type="hidden" name="id" value={m.id} />
                <div className="field-row">
                  <div className="field">
                    <label>Nom</label>
                    <input name="name" defaultValue={m.name} required />
                  </div>
                  <div className="field">
                    <label>Fonction / rôle</label>
                    <input name="role" defaultValue={m.role} />
                  </div>
                </div>
                <div className="field">
                  <label>Biographie</label>
                  <textarea name="bio" defaultValue={m.bio} />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Photo (URL)</label>
                    <input name="photoUrl" defaultValue={m.photoUrl} />
                  </div>
                  <div className="field">
                    <label>Ordre d&apos;affichage</label>
                    <input name="position" type="number" defaultValue={m.position} />
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" type="submit" disabled={!hasDatabase}>
                  Enregistrer
                </button>
              </form>
            </div>
          ))}

          <div className="admin-item">
            <div className="admin-item-head">
              <strong>Ajouter un membre</strong>
            </div>
            <form action={saveTeamMemberAction}>
              <div className="field-row">
                <div className="field">
                  <label>Nom</label>
                  <input name="name" required />
                </div>
                <div className="field">
                  <label>Fonction / rôle</label>
                  <input name="role" />
                </div>
              </div>
              <div className="field">
                <label>Biographie</label>
                <textarea name="bio" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Photo (URL)</label>
                  <input name="photoUrl" placeholder="/images/…" />
                </div>
                <div className="field">
                  <label>Ordre d&apos;affichage</label>
                  <input name="position" type="number" defaultValue={team.length + 1} />
                </div>
              </div>
              <button className="btn btn-primary btn-sm" type="submit" disabled={!hasDatabase}>
                Ajouter le membre
              </button>
            </form>
          </div>
        </section>

        {/* Domains */}
        <section id="domains" className="admin-card">
          <h2>Domaines d&apos;intervention ({domains.length})</h2>
          {domains.map((d) => (
            <div key={d.id} className="admin-item">
              <div className="admin-item-head">
                <strong>{d.title}</strong>
                <form action={deleteDomainAction} className="inline-form">
                  <input type="hidden" name="id" value={d.id} />
                  <button className="btn btn-danger btn-sm" type="submit" disabled={!hasDatabase}>
                    Supprimer
                  </button>
                </form>
              </div>
              <form action={saveDomainAction}>
                <input type="hidden" name="id" value={d.id} />
                <div className="field">
                  <label>Titre</label>
                  <input name="title" defaultValue={d.title} required />
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea name="description" defaultValue={d.description} />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Icône</label>
                    <select name="icon" defaultValue={d.icon}>
                      {ICON_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Ordre d&apos;affichage</label>
                    <input name="position" type="number" defaultValue={d.position} />
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" type="submit" disabled={!hasDatabase}>
                  Enregistrer
                </button>
              </form>
            </div>
          ))}

          <div className="admin-item">
            <div className="admin-item-head">
              <strong>Ajouter un domaine</strong>
            </div>
            <form action={saveDomainAction}>
              <div className="field">
                <label>Titre</label>
                <input name="title" required />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea name="description" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Icône</label>
                  <select name="icon" defaultValue="leaf">
                    {ICON_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Ordre d&apos;affichage</label>
                  <input name="position" type="number" defaultValue={domains.length + 1} />
                </div>
              </div>
              <button className="btn btn-primary btn-sm" type="submit" disabled={!hasDatabase}>
                Ajouter le domaine
              </button>
            </form>
          </div>
        </section>

        {/* News */}
        <section id="news" className="admin-card">
          <h2>Actualités ({news.length})</h2>
          {news.map((post) => (
            <div key={post.id} className="admin-item">
              <div className="admin-item-head">
                <strong>{post.title}</strong>
                <form action={deleteNewsAction} className="inline-form">
                  <input type="hidden" name="id" value={post.id} />
                  <button className="btn btn-danger btn-sm" type="submit" disabled={!hasDatabase}>
                    Supprimer
                  </button>
                </form>
              </div>
              <form action={saveNewsAction}>
                <input type="hidden" name="id" value={post.id} />
                <div className="field">
                  <label>Titre</label>
                  <input name="title" defaultValue={post.title} required />
                </div>
                <div className="field">
                  <label>Résumé</label>
                  <textarea name="excerpt" defaultValue={post.excerpt} />
                </div>
                <div className="field">
                  <label>Contenu complet</label>
                  <textarea name="body" defaultValue={post.body} style={{ minHeight: 140 }} />
                </div>
                <div className="field">
                  <label>Image (URL)</label>
                  <input name="imageUrl" defaultValue={post.imageUrl} />
                </div>
                <div className="field">
                  <label>
                    <input type="checkbox" name="published" defaultChecked={post.published} style={{ width: "auto", marginRight: 8 }} />
                    Publiée (visible sur le site)
                  </label>
                </div>
                <button className="btn btn-ghost btn-sm" type="submit" disabled={!hasDatabase}>
                  Enregistrer
                </button>
              </form>
            </div>
          ))}

          <div className="admin-item">
            <div className="admin-item-head">
              <strong>Publier une actualité</strong>
            </div>
            <form action={saveNewsAction}>
              <div className="field">
                <label>Titre</label>
                <input name="title" required />
              </div>
              <div className="field">
                <label>Résumé</label>
                <textarea name="excerpt" />
              </div>
              <div className="field">
                <label>Contenu complet</label>
                <textarea name="body" style={{ minHeight: 140 }} />
              </div>
              <div className="field">
                <label>Image (URL)</label>
                <input name="imageUrl" placeholder="/images/…" />
              </div>
              <div className="field">
                <label>
                  <input type="checkbox" name="published" defaultChecked style={{ width: "auto", marginRight: 8 }} />
                  Publiée (visible sur le site)
                </label>
              </div>
              <button className="btn btn-primary btn-sm" type="submit" disabled={!hasDatabase}>
                Publier
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
