// /app/api/shorten/route.ts
import { connectToDB } from "/Project/short-innovaxel-lastname/url-shortener/app/lib/mongodb";
import { ShortUrl } from "/Project/short-innovaxel-lastname/url-shortener/app/models/ShortUrl";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  await connectToDB();
  const { longUrl } = await req.json();
  const shortCode = nanoid(6);

  const shortUrl = await ShortUrl.create({ longUrl, shortCode });
  return Response.json(shortUrl);
}
