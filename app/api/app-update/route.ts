import {NextResponse} from "next/server";import {latestAppRelease} from "@/lib/latestAppRelease";
export const dynamic="force-dynamic";
export async function GET(){try{return NextResponse.json(await latestAppRelease(),{headers:{"Cache-Control":"no-store"}});}catch{return NextResponse.json({error:"Update check is temporarily unavailable. Try again later."},{status:503,headers:{"Cache-Control":"no-store"}});}}
