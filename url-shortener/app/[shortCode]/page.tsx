import { redirect } from "next/navigation";
import { connectToDB } from "@/app/lib/mongodb";
import { ShortUrl } from "@/app/models/ShortUrl";

interface Props {
  params: {
    shortCode: string;
  };
}

export default async function RedirectPage({ params }: Props) {
  await connectToDB();

  const found = await ShortUrl.findOne({ shortCode: params.shortCode });

  if (!found) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-xl">
        Short URL not found
      </div>
    );
  }

  found.accessCount += 1;
  await found.save();

  redirect(found.longUrl); // ✅ instantly redirect to original URL
}
