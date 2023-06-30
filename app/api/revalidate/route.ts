import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  const tags = req.nextUrl.searchParams.get("tags");

  for (const tag of tags?.split(",") ?? []) {
    console.log("revalidating", tag);
    revalidateTag(tag);
  }

  return NextResponse.json({
    tags: tags?.split(",") ?? [],
    revalidated: true,
  });
}
