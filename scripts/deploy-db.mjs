// Runs at build time. Pushes the Prisma schema to the database and seeds
// default content once, so the deployed site is persistent. If no DATABASE_URL
// is configured (e.g. a preview without a database), it skips gracefully so the
// build still succeeds and the site runs in demonstration mode.
import { execSync } from "node:child_process"

if (!process.env.DATABASE_URL) {
  console.log("[deploy-db] No DATABASE_URL found — skipping schema push (demo mode).")
  process.exit(0)
}

try {
  console.log("[deploy-db] Pushing Prisma schema to the database...")
  execSync("prisma db push --skip-generate --accept-data-loss", { stdio: "inherit" })
} catch (error) {
  console.error("[deploy-db] Schema push failed:", error?.message || error)
  // Do not block the build; the app falls back to demo content if the DB is unreachable.
  process.exit(0)
}

try {
  const { PrismaClient } = await import("@prisma/client")
  const prisma = new PrismaClient()

  const existing = await prisma.setting.findUnique({ where: { id: 1 } })
  if (!existing) {
    console.log("[deploy-db] Seeding default settings...")
    await prisma.setting.create({
      data: {
        id: 1,
        orgName: "ONGD SALAAM",
        tagline:
          "Organisation Non Gouvernementale de Développement — pour la paix et le développement communautaire",
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
      },
    })
  }

  const domainCount = await prisma.domain.count()
  if (domainCount === 0) {
    console.log("[deploy-db] Seeding default domains...")
    await prisma.domain.createMany({
      data: [
        {
          title: "Paix et cohésion sociale",
          description:
            "Promotion du dialogue, prévention des conflits et renforcement du vivre-ensemble au sein des communautés.",
          icon: "peace",
          position: 1,
        },
        {
          title: "Développement communautaire",
          description:
            "Appui aux initiatives locales et accompagnement des communautés dans la conduite de projets de développement.",
          icon: "community",
          position: 2,
        },
        {
          title: "Éducation et formation",
          description:
            "Sensibilisation, encadrement et renforcement des capacités des jeunes et des acteurs communautaires.",
          icon: "education",
          position: 3,
        },
        {
          title: "Santé et action sociale",
          description:
            "Actions de promotion de la santé, de solidarité et d'assistance aux personnes vulnérables.",
          icon: "health",
          position: 4,
        },
        {
          title: "Environnement et agriculture",
          description:
            "Promotion de pratiques durables, protection de l'environnement et soutien aux activités agricoles.",
          icon: "leaf",
          position: 5,
        },
        {
          title: "Autonomisation des femmes et des jeunes",
          description:
            "Appui à l'entrepreneuriat, à l'inclusion et à la participation des femmes et des jeunes.",
          icon: "empower",
          position: 6,
        },
      ],
    })
  }

  const teamCount = await prisma.teamMember.count()
  if (teamCount === 0) {
    console.log("[deploy-db] Seeding default team...")
    await prisma.teamMember.createMany({
      data: [
        {
          name: "Le Président",
          role: "Président de l'ONGD SALAAM",
          bio: "Biographie complète à compléter via l'espace d'administration.",
          photoUrl: "/images/president.png",
          position: 1,
        },
        {
          name: "Awa Yongo Madina",
          role: "Membre de l'équipe",
          bio: "Fonction et biographie à compléter via l'espace d'administration.",
          photoUrl: "/images/awa-yongo-madina.png",
          position: 2,
        },
        {
          name: "Salahadine",
          role: "Membre de l'équipe",
          bio: "Fonction et biographie à compléter via l'espace d'administration.",
          photoUrl: "/images/salahadine.png",
          position: 3,
        },
      ],
    })
  }

  const newsCount = await prisma.newsPost.count()
  if (newsCount === 0) {
    console.log("[deploy-db] Seeding default news...")
    await prisma.newsPost.create({
      data: {
        title: "Bienvenue sur le site officiel d'ONGD SALAAM",
        excerpt:
          "Découvrez notre mission, nos domaines d'intervention et notre équipe. Les actualités et projets seront publiés au fil des activités.",
        body:
          "Ce site présente l'ONGD SALAAM et son action au service des communautés du Nord-Ubangi. Les actualités, projets et documents officiels seront ajoutés progressivement via l'espace d'administration.",
        imageUrl: "/images/office-activity.png",
        published: true,
      },
    })
  }

  await prisma.$disconnect()
  console.log("[deploy-db] Database ready.")
} catch (error) {
  console.error("[deploy-db] Seeding failed:", error?.message || error)
  process.exit(0)
}
