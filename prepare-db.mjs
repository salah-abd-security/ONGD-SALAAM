// Prépare la base de données pendant le build Vercel :
// crée/met à jour les tables et insère les données initiales si la base est vide.
// Si DATABASE_URL n'est pas défini, l'étape est ignorée (le site reste en mode démonstration).
import { execSync } from 'node:child_process';

if (!process.env.DATABASE_URL) {
  console.log('[prepare-db] DATABASE_URL absent : base de données ignorée (mode démonstration).');
  process.exit(0);
}

// Neon (via Vercel) fournit une URL directe, plus fiable pour modifier le schéma.
const env = { ...process.env };
if (env.DATABASE_URL_UNPOOLED) env.DATABASE_URL = env.DATABASE_URL_UNPOOLED;

execSync('npx prisma db push --skip-generate', { stdio: 'inherit', env });
execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', env });
console.log('[prepare-db] Base de données prête.');
