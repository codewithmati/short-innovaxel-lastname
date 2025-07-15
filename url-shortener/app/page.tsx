'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(`${window.location.origin}/api/shorten/${data.shortCode}`);
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-6  00">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <input
        type="text"
        className="p-2 border rounded w-full max-w-md mb-4"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Shorten URL
      </button>
      {shortUrl && (
        <p className="mt-4">
          Short URL:{' '}
          <a href={shortUrl} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
