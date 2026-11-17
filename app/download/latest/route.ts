import {NextResponse} from "next/server";import {latestAppRelease} from "@/lib/latestAppRelease";
export const dynamic="force-dynamic";
export async function GET(){try{const r=NextResponse.redirect((await latestAppRelease()).downloadUrl,307);r.headers.set("Cache-Control","no-store");return r;}catch{return NextResponse.json({error:"APK download is temporarily unavailable. Please retry."},{status:503,headers:{"Cache-Control":"no-store"}});}}
