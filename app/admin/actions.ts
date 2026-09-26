"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma, hasDatabase } from "@/lib/prisma"
import {
  verifyPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/auth"

async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }
}

function s(form: FormData, key: string): string {
  const v = form.get(key)
  return typeof v === "string" ? v.trim() : ""
}

function n(form: FormData, key: string): number {
  const v = Number(form.get(key))
  return Number.isFinite(v) ? v : 0
}

export async function loginAction(_prev: unknown, form: FormData) {
  const password = s(form, "password")
  if (!verifyPassword(password)) {
    return { error: "Mot de passe incorrect." }
  }
  await createSession()
  redirect("/admin")
}

export async function logoutAction() {
  await destroySession()
  redirect("/admin/login")
}

function ensureDb() {
  if (!hasDatabase) {
    throw new Error(
      "La base de données n'est pas connectée dans cet environnement. Les modifications sont disponibles une fois le site déployé avec DATABASE_URL.",
    )
  }
}

function refresh() {
  revalidatePath("/")
  revalidatePath("/admin")
}

/* ---------- Settings ---------- */
export async function saveSettingsAction(form: FormData) {
  await requireAuth()
  ensureDb()
  const data = {
    orgName: s(form, "orgName"),
    tagline: s(form, "tagline"),
    heroTitle: s(form, "heroTitle"),
    heroSubtitle: s(form, "heroSubtitle"),
    mission: s(form, "mission"),
    vision: s(form, "vision"),
    values: s(form, "values"),
    address: s(form, "address"),
    city: s(form, "city"),
    region: s(form, "region"),
    phone: s(form, "phone"),
    email: s(form, "email"),
    whatsapp: s(form, "whatsapp"),
    linkedin: s(form, "linkedin"),
  }
  await prisma.setting.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  })
  refresh()
}

/* ---------- Team ---------- */
export async function saveTeamMemberAction(form: FormData) {
  await requireAuth()
  ensureDb()
  const id = n(form, "id")
  const data = {
    name: s(form, "name"),
    role: s(form, "role"),
    bio: s(form, "bio"),
    photoUrl: s(form, "photoUrl") || "/images/office-activity.png",
    position: n(form, "position"),
  }
  if (id) {
    await prisma.teamMember.update({ where: { id }, data })
  } else {
    await prisma.teamMember.create({ data })
  }
  refresh()
}

export async function deleteTeamMemberAction(form: FormData) {
  await requireAuth()
  ensureDb()
  await prisma.teamMember.delete({ where: { id: n(form, "id") } })
  refresh()
}

/* ---------- Domains ---------- */
export async function saveDomainAction(form: FormData) {
  await requireAuth()
  ensureDb()
  const id = n(form, "id")
  const data = {
    title: s(form, "title"),
    description: s(form, "description"),
    icon: s(form, "icon") || "leaf",
    position: n(form, "position"),
  }
  if (id) {
    await prisma.domain.update({ where: { id }, data })
  } else {
    await prisma.domain.create({ data })
  }
  refresh()
}

export async function deleteDomainAction(form: FormData) {
  await requireAuth()
  ensureDb()
  await prisma.domain.delete({ where: { id: n(form, "id") } })
  refresh()
}

/* ---------- News ---------- */
export async function saveNewsAction(form: FormData) {
  await requireAuth()
  ensureDb()
  const id = n(form, "id")
  const data = {
    title: s(form, "title"),
    excerpt: s(form, "excerpt"),
    body: s(form, "body"),
    imageUrl: s(form, "imageUrl"),
    published: form.get("published") === "on",
  }
  if (id) {
    await prisma.newsPost.update({ where: { id }, data })
  } else {
    await prisma.newsPost.create({ data })
  }
  refresh()
}

export async function deleteNewsAction(form: FormData) {
  await requireAuth()
  ensureDb()
  await prisma.newsPost.delete({ where: { id: n(form, "id") } })
  refresh()
}
