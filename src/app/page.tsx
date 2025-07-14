'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

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

  if (showLoader) {
    return <Loader onFinish={() => setShowLoader(false)} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background text-foreground">
      <h1 className="text-4xl font-extrabold mb-6 text-center neon-text">
        🚀 Blog Summariser
      </h1>

      <div className="w-full max-w-xl space-y-4 bg-white/5 dark:bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-lg border border-purple-500/30">
        <Input
          placeholder="Paste blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-black/20 text-white placeholder:text-purple-300 border-purple-500 focus:ring-2 focus:ring-purple-500/70"
        />

        <Button
          onClick={handleSummarise}
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 shadow-md text-white font-semibold transition duration-300"
        >
          {loading ? 'Summarising...' : 'Summarise'}
        </Button>

        {summary && (
          <div className="mt-4 border border-purple-400 rounded-xl p-4 bg-purple-900/20 text-white shadow-inner">
            <h2 className="font-semibold text-lg mb-2">📄 Urdu Summary:</h2>
            <p className="text-purple-100 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}
