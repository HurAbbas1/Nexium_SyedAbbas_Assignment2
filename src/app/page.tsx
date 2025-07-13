'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/summarise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setSummary(data.urdu || 'Something went wrong.');
    } catch (error) {
      setSummary('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-2xl font-bold">Blog Summariser</h1>
      <Input
        placeholder="Paste blog URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleSummarise} disabled={loading}>
        {loading ? 'Summarising...' : 'Summarise'}
      </Button>
      {summary && (
        <div className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold mb-2">📄 Urdu Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </main>
  );
}
