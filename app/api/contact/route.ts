import {NextResponse} from 'next/server';
export async function POST(req:Request){const body=await req.json().catch(()=>null); if(!body?.name||!body?.email||!body?.message)return NextResponse.json({error:'Champs requis manquants'},{status:400}); return NextResponse.json({ok:true,message:'Message reçu. La messagerie peut être reliée à un service email dans une prochaine configuration.'});}
