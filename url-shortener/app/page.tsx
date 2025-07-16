"use client";

import { useState } from "react";

const Page = () => {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setShort("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }), // ✅ matches your API
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setShort(`${window.location.origin}/${data.shortCode}`);
    } catch (err) {
      setError("Failed to connect to server.");
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>

      <input
        className="border border-gray-400 p-2 w-full max-w-md rounded mb-4"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Shorten
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {short && (
        <p className="mt-4 text-green-700">
          Short URL:{" "}
          <a href={short} className="underline text-blue-600" target="_blank">
            {short}
          </a>
        </p>
      )}
    </main>
  );
};

export default Page;
