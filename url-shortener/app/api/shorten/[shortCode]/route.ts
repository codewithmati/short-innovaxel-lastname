// app/api/shorten/[shortCode]/route.ts
import { connectToDB } from "@/app/lib/mongodb";
import { ShortUrl } from "@/app/models/ShortUrl";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export async function GET(
    _req: NextRequest,
    context: { params: { shortCode: string } }
  ) {
    try {
      const { params } = context;
  
      if (!params?.shortCode) {
        return NextResponse.json({ error: "Short code required" }, { status: 400 });
      }
  
      await connectToDB();
  
      const data = await ShortUrl.findOne({ shortCode: params.shortCode });
  
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
  

// PUT handler
export async function PUT(
  req: NextRequest,
  context: { params: { shortCode: string } }
) {
  try {
    const { params } = context;
    await connectToDB();

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const updated = await ShortUrl.findOneAndUpdate(
      { shortCode: params.shortCode },
      { longUrl: url, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated._id,
      url: updated.longUrl,
      shortCode: updated.shortCode,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });
  } catch (err) {
    console.error("PUT API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(
    _req: NextRequest,
    { params }: { params: { shortCode: string } }
  ) {
    try {
      await connectToDB();
  
      if (!params?.shortCode) {
        return NextResponse.json({ error: "Short code is required" }, { status: 400 });
      }
  
      const deleted = await ShortUrl.findOneAndDelete({ shortCode: params.shortCode });
  
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
  
      return new NextResponse(null, { status: 204 });
    } catch (err) {
      console.error("DELETE API Error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
