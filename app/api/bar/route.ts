import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log(req.nextUrl);
  const input = req.nextUrl.searchParams.get("input");
  console.log(input);

  return NextResponse.json({
    ...(input ? JSON.parse(input) : undefined),
    now: new Date().toISOString(),
  });
}
