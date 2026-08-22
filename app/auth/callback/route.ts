import { NextResponse } from "next/server";
import { createClientServer } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClientServer();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("SESSION ERROR:", error);
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  return NextResponse.redirect(`${origin}/`);
}