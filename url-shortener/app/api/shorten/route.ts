// File: /app/api/shorten/route.ts
import { nanoid } from "nanoid";
import { connectToDB } from "@/app/lib/mongodb";
import { ShortUrl } from "@/app/models/ShortUrl";
import { NextRequest } from "next/server"; // ✅ Import this
import { NextResponse } from "next/server"; // ✅ Import this

export async function POST(req: NextRequest) {
  await connectToDB();
  let body;

  try {
    body = await req.json();
  } catch (err) {
    console.error("Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); // ✅ Use NextResponse
  }

  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const shortCode = nanoid(6);
  const newUrl = await ShortUrl.create({ longUrl: url, shortCode });

  return NextResponse.json({
    id: newUrl._id,
    url: newUrl.longUrl,
    shortCode: newUrl.shortCode,
    createdAt: newUrl.createdAt,
    updatedAt: newUrl.updatedAt,
  }, { status: 201 });
}
