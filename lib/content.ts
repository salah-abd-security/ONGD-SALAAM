import { prisma, hasDatabase } from "./prisma"

export type Settings = {
  orgName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  mission: string
  vision: string
  values: string
  address: string
  city: string
  region: string
  phone: string
  email: string
  whatsapp: string
  linkedin: string
}

export type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  photoUrl: string
  position: number
}

export type Domain = {
  id: number
  title: string
  description: string
  icon: string
  position: number
}

export type NewsPost = {
  id: number
  title: string
  date: string
  excerpt: string
  body: string
  imageUrl: string
  published: boolean
}

export const defaultSettings: Settings = {
  orgName: "ONGD SALAAM",
  tagline: "Protection, bâtir la paix, l’éducation, action humanitaire et développement communautaire",
  heroTitle: "Ensemble pour la paix et le développement au Nord-Ubangi",
  heroSubtitle:
    "ONGD SALAAM accompagne les jeunes, les femmes et les hommes de Gbadolite et du Nord-Ubangi à travers des actions de protection, de paix, d’éducation, d’aide humanitaire et de développement communautaire.",
  mission:
    "ONGD SALAAM accompagne les communautés du Nord-Ubangi, en particulier les personnes vulnérables, déplacées et réfugiées, à travers des actions de protection, de paix et de cohésion sociale, d’action humanitaire, d’éducation et de développement communautaire.",
  vision:
    "Contribuer à des communautés plus pacifiques, solidaires, inclusives et capables de construire durablement leur avenir.",
  values:
    "Paix • Solidarité • Intégrité • Respect de la dignité humaine • Engagement communautaire",
  address: "Gbadolite",
  city: "Gbadolite",
  region: "Province du Nord-Ubangi, République Démocratique du Congo",
  phone: "+243 828 382 289",
  email: "ongdsalaamgbadolite@gmail.com",
  whatsapp: "https://whatsapp.com/channel/0029VbCkAHQ9WtBygpQFIN2N",
  linkedin: "https://www.linkedin.com/in/ongd-salaam-385b1b437",
}

export const defaultDomains: Domain[] = [
  { id: 1, title: "Protection", description: "Actions de protection et accompagnement des personnes vulnérables.", icon: "peace", position: 1 },
  { id: 2, title: "Paix et cohésion sociale", description: "Promotion du dialogue, de la paix et du vivre-ensemble au sein des communautés.", icon: "peace", position: 2 },
  { id: 3, title: "Action humanitaire", description: "Assistance et accompagnement des personnes vulnérables, déplacées et réfugiées.", icon: "health", position: 3 },
  { id: 4, title: "Éducation", description: "Actions en faveur de l’éducation et du renforcement des capacités des jeunes et des communautés.", icon: "education", position: 4 },
  { id: 5, title: "Développement communautaire", description: "Appui aux initiatives locales et contribution au développement durable du Nord-Ubangi.", icon: "community", position: 5 },
]

export const defaultTeam: TeamMember[] = [
  { id: 1, name: "MAHAMAT ADAM SALEH", role: "Président", bio: "", photoUrl: "/images/president.png", position: 1 },
  { id: 2, name: "ADAM SATO Abakar", role: "Vice-président", bio: "", photoUrl: "", position: 2 },
  { id: 3, name: "AWA YONGO Madina", role: "Trésorière", bio: "", photoUrl: "/images/awa-yongo-madina.png", position: 3 },
  { id: 4, name: "MOUSSA ABAKAR Sato", role: "Secrétaire exécutif", bio: "", photoUrl: "", position: 4 },
  { id: 5, name: "MOLULI MOKWETI Ibrahim", role: "Secrétaire exécutif adjoint", bio: "", photoUrl: "", position: 5 },
  { id: 6, name: "MBALO TOBIMBE Alain", role: "Conseiller du développement", bio: "", photoUrl: "", position: 6 },
  { id: 7, name: "ABDASSAMAD SATO Abakar", role: "Conseiller religieux", bio: "", photoUrl: "", position: 7 },
  { id: 8, name: "OUSMAN ADAM Abdel", role: "Commissaire aux comptes", bio: "", photoUrl: "", position: 8 },
  { id: 9, name: "SALAHADINE ABDASSAMAD", role: "Inspecteur Générale", bio: "", photoUrl: "/images/salahadine.png", position: 9 },
  { id: 10, name: "MBIMBA LITA Adrien", role: "Secrétaire rapporteur", bio: "", photoUrl: "", position: 10 },
  { id: 11, name: "GBANZI", role: "Comptable", bio: "", photoUrl: "", position: 11 },
]

export const defaultNews: NewsPost[] = [
  {
    id: 1,
    title: "Bienvenue sur le site officiel d’ONGD SALAAM",
    date: new Date().toISOString(),
    excerpt:
      "Découvrez la mission, les domaines d’intervention et l’équipe de l’ONGD SALAAM. Les projets et actualités seront publiés progressivement.",
    body:
      "Ce site présente l’ONGD SALAAM et ses domaines d’action dans le Nord-Ubangi. Les projets, actualités et documents officiels pourront être ajoutés progressivement depuis l’espace d’administration.",
    imageUrl: "/images/office-activity.png",
    published: true,
  },
]

export async function getSettings(): Promise<Settings> {
  if (!hasDatabase) return defaultSettings
  try {
    const row = await prisma.setting.findUnique({ where: { id: 1 } })
    if (!row) return defaultSettings
    return { ...row }
  } catch {
    return defaultSettings
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  if (!hasDatabase) return defaultTeam
  try {
    const rows = await prisma.teamMember.findMany({ orderBy: { position: "asc" } })
    return rows.length ? rows.map((r) => ({ ...r })) : defaultTeam
  } catch {
    return defaultTeam
  }
}

export async function getDomains(): Promise<Domain[]> {
  if (!hasDatabase) return defaultDomains
  try {
    const rows = await prisma.domain.findMany({ orderBy: { position: "asc" } })
    return rows.length ? rows.map((r) => ({ ...r })) : defaultDomains
  } catch {
    return defaultDomains
  }
}

export async function getNews(onlyPublished = true): Promise<NewsPost[]> {
  if (!hasDatabase) return onlyPublished ? defaultNews.filter((n) => n.published) : defaultNews
  try {
    const rows = await prisma.newsPost.findMany({
      where: onlyPublished ? { published: true } : undefined,
      orderBy: { date: "desc" },
    })
    return rows.map((r) => ({ ...r, date: r.date.toISOString() }))
  } catch {
    return onlyPublished ? defaultNews.filter((n) => n.published) : defaultNews
  }
}
