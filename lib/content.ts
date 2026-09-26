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
  tagline: "Organisation Non Gouvernementale de Développement — pour la paix et le développement communautaire",
  heroTitle: "Ensemble pour la paix et le développement au Nord-Ubangi",
  heroSubtitle:
    "ONGD SALAAM œuvre auprès des communautés de Gbadolite et du Nord-Ubangi pour promouvoir la paix, la solidarité et un développement durable et inclusif.",
  mission:
    "ONGD SALAAM a pour mission de contribuer au mieux-être des populations du Nord-Ubangi en promouvant la paix, la cohésion sociale et le développement communautaire durable, à travers des actions de terrain menées avec et pour les communautés.",
  vision:
    "Une société apaisée, solidaire et prospère, où chaque personne — en particulier les plus vulnérables — dispose des moyens de vivre dignement et de participer au développement de sa communauté.",
  values:
    "Paix • Solidarité • Intégrité • Transparence • Respect de la dignité humaine • Engagement communautaire",
  address: "Gbadolite",
  city: "Gbadolite",
  region: "Province du Nord-Ubangi, République Démocratique du Congo",
  phone: "",
  email: "",
  whatsapp: "",
  linkedin: "",
}

export const defaultDomains: Domain[] = [
  {
    id: 1,
    title: "Paix et cohésion sociale",
    description:
      "Promotion du dialogue, prévention des conflits et renforcement du vivre-ensemble au sein des communautés.",
    icon: "peace",
    position: 1,
  },
  {
    id: 2,
    title: "Développement communautaire",
    description:
      "Appui aux initiatives locales et accompagnement des communautés dans la conduite de projets de développement.",
    icon: "community",
    position: 2,
  },
  {
    id: 3,
    title: "Éducation et formation",
    description:
      "Sensibilisation, encadrement et renforcement des capacités des jeunes et des acteurs communautaires.",
    icon: "education",
    position: 3,
  },
  {
    id: 4,
    title: "Santé et action sociale",
    description:
      "Actions de promotion de la santé, de solidarité et d'assistance aux personnes vulnérables.",
    icon: "health",
    position: 4,
  },
  {
    id: 5,
    title: "Environnement et agriculture",
    description:
      "Promotion de pratiques durables, protection de l'environnement et soutien aux activités agricoles.",
    icon: "leaf",
    position: 5,
  },
  {
    id: 6,
    title: "Autonomisation des femmes et des jeunes",
    description:
      "Appui à l'entrepreneuriat, à l'inclusion et à la participation des femmes et des jeunes.",
    icon: "empower",
    position: 6,
  },
]

export const defaultTeam: TeamMember[] = [
  {
    id: 1,
    name: "Le Président",
    role: "Président de l'ONGD SALAAM",
    bio: "Biographie complète à compléter via l'espace d'administration.",
    photoUrl: "/images/president.png",
    position: 1,
  },
  {
    id: 2,
    name: "Awa Yongo Madina",
    role: "Membre de l'équipe",
    bio: "Fonction et biographie à compléter via l'espace d'administration.",
    photoUrl: "/images/awa-yongo-madina.png",
    position: 2,
  },
  {
    id: 3,
    name: "Salahadine",
    role: "Membre de l'équipe",
    bio: "Fonction et biographie à compléter via l'espace d'administration.",
    photoUrl: "/images/salahadine.png",
    position: 3,
  },
]

export const defaultNews: NewsPost[] = [
  {
    id: 1,
    title: "Bienvenue sur le site officiel d'ONGD SALAAM",
    date: new Date().toISOString(),
    excerpt:
      "Découvrez notre mission, nos domaines d'intervention et notre équipe. Les actualités et projets seront publiés au fil des activités.",
    body:
      "Ce site présente l'ONGD SALAAM et son action au service des communautés du Nord-Ubangi. Les actualités, projets et documents officiels seront ajoutés progressivement via l'espace d'administration.",
    imageUrl: "/images/office-activity.png",
    published: true,
  },
]

export async function getSettings(): Promise<Settings> {
  if (!hasDatabase) return defaultSettings
  try {
    const row = await prisma.setting.findUnique({ where: { id: 1 } })
    if (!row) return defaultSettings
    return {
      orgName: row.orgName,
      tagline: row.tagline,
      heroTitle: row.heroTitle,
      heroSubtitle: row.heroSubtitle,
      mission: row.mission,
      vision: row.vision,
      values: row.values,
      address: row.address,
      city: row.city,
      region: row.region,
      phone: row.phone,
      email: row.email,
      whatsapp: row.whatsapp,
      linkedin: row.linkedin,
    }
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
