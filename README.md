# ONGD SALAAM — site dynamique

Site professionnel Next.js avec espace d’administration pour ajouter/modifier/supprimer les contenus au fil des années.

## Contenu déjà intégré
- Identité et mission communiquées par ONGD SALAAM
- Logo officiel fourni
- Coordonnées de Gbadolite / Nord-Ubangi
- WhatsApp Channel et LinkedIn fournis
- Domaines d’intervention
- Équipe et fonctions communiquées
- Photos fournies pour le président, Awa Yongo Madina, Salahadine et une activité de bureau

## Administration
URL : `/admin`
Le mot de passe est défini par `ADMIN_PASSWORD`.

## Base de données
Le site utilise PostgreSQL via Prisma pour rendre l’administration réellement persistante sur un hébergement cloud.
1. Copier `.env.example` vers `.env.local`.
2. Renseigner `DATABASE_URL` et `ADMIN_PASSWORD`.
3. Exécuter `npm install` puis `npx prisma db push` et `npm run db:seed`.
4. Lancer `npm run dev`.

Sans `DATABASE_URL`, le site public fonctionne en mode démonstration avec les données initiales, mais les modifications de l’administration ne sont pas persistantes. Sur Vercel, il faut donc connecter une base PostgreSQL et ajouter `DATABASE_URL`, `ADMIN_SECRET` et `ADMIN_PASSWORD` dans les variables d’environnement.

## Déploiement Vercel
Le projet est compatible Vercel. Après connexion d’une base PostgreSQL :
- Build command : `npm run build`
- Install command : `npm install`
- Start command : `npm start`

## Remarque sur les données
Aucune information institutionnelle non fournie n’a été inventée. Les éléments à compléter (projets, actualités, documents, biographies, autres réseaux, etc.) disposent d’espaces d’administration.

## Données volontairement laissées à compléter
Les biographies complètes, nouveaux projets, actualités, documents PDF, galerie supplémentaire, chaîne YouTube et autres réseaux sociaux ne sont pas inventés. Ils pourront être ajoutés via `/admin` lorsque l’administration fournira les informations officielles.
