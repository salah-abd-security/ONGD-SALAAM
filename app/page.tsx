import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { MissionSection } from "@/components/mission-section"
import { DomainsSection } from "@/components/domains-section"
import { TeamSection } from "@/components/team-section"
import { NewsSection } from "@/components/news-section"
import { ContactSection } from "@/components/contact-section"
import { getSettings, getTeam, getDomains, getNews } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [settings, team, domains, news] = await Promise.all([
    getSettings(),
    getTeam(),
    getDomains(),
    getNews(true),
  ])

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <Hero settings={settings} />
        <MissionSection settings={settings} />
        <DomainsSection domains={domains} />
        <TeamSection team={team} />
        <NewsSection news={news} />
        <ContactSection settings={settings} />
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
