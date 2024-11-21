import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=be0f4ba3-1396-4f89-afb0-dcd94b62e9a8`);
    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
}