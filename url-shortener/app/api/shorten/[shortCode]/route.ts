//app/api/shorten/[shortCode]/route.ts
import { connectToDB } from "@/app/lib/mongodb";
import { ShortUrl } from "@/app/models/ShortUrl";
import {NextRequest, NextResponse } from "next/server";
export async function GET(
    _req: NextRequest,
    { params }: { params: { shortCode: string } }
  ) {
    try {
      await connectToDB();
  
      if (!params?.shortCode) {
        return NextResponse.json({ error: "Short code required" }, { status: 400 });
      }
  
      const data = await ShortUrl.findOne({ shortCode:params?.shortCode });
  
      if (!data) {
        return NextResponse.json({ error: "URL not found" }, { status: 404 });
      }
  
      return NextResponse.json({
        id: data._id,
        url: data.longUrl,
        shortCode: data.shortCode,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    } catch (err) {
      console.error("GET API Error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }