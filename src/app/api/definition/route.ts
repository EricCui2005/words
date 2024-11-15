import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=6c1313af-ca6f-4a19-8443-6f49470c0e0d`);
    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
}