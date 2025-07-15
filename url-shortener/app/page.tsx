"use client";
import { useState } from 'react'

const page = () => {
  const [url, setUrl] = useState("");
  const handleSubmit = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ longUrl: url }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
  };
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      <input
        className="border p-2 w-full max-w-md mb-4"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Shorten
      </button>
        <p className="mt-4 text-green-600">
          Short URL: <a className="underline"></a>
        </p>
    </main>
    </>
  )
}

export default page