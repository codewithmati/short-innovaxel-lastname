import { connectToDB } from "@/app/lib/mongodb";
import { ShortUrl } from "@/app/models/ShortUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  await connectToDB();

  const urlData = await ShortUrl.findOne({ shortCode: params.shortCode });

  if (!urlData) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: urlData._id,
    url: urlData.longUrl,
    shortCode: urlData.shortCode,
    createdAt: urlData.createdAt,
    updatedAt: urlData.updatedAt,
    accessCount: urlData.accessCount,
  });
}
