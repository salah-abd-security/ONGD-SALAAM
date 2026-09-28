import { PrismaClient } from '@prisma/client';
import { seed } from './seed-data';

declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getPublicData() {
  if (!hasDatabase) return seed;
  try {
    const [settings, actions, team, news, projects, gallery, documents, social] = await Promise.all([
      prisma.siteSetting.findMany(), prisma.action.findMany({where:{active:true},orderBy:{order:'asc'}}),
      prisma.teamMember.findMany({where:{active:true},orderBy:{order:'asc'}}), prisma.news.findMany({where:{active:true},orderBy:{publishedAt:'desc'},take:6}),
      prisma.project.findMany({where:{active:true},orderBy:{createdAt:'desc'},take:6}), prisma.galleryItem.findMany({where:{active:true},orderBy:{createdAt:'desc'},take:12}),
      prisma.document.findMany({where:{active:true},orderBy:{publishedAt:'desc'}}), prisma.socialLink.findMany({where:{active:true},orderBy:{order:'asc'}})
    ]);
    const s = Object.fromEntries(settings.map(x=>[x.key,x.value]));
    return {settings: {...seed.settings,...s}, actions, team, news, projects, gallery, documents, social};
  } catch { return seed; }
}
