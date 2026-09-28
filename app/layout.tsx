import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title:'ONGD SALAAM | Gbadolite – Nord-Ubangi', description:'Site officiel de l’ONGD SALAAM, organisation basée à Gbadolite, Nord-Ubangi, RDC.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
