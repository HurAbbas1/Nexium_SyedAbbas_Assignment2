'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Flame } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    { left: '#111111', right: '#2c2c2c' },
    { left: '#1a002b', right: '#220052' },
    { left: '#0f2027', right: '#203a43' },
    { left: '#0b0c10', right: '#1f2833' },
  ];

  useEffect(() => {
    const theme = themes[themeIndex];
    document.documentElement.style.setProperty('--left-color', theme.left);
    document.documentElement.style.setProperty('--right-color', theme.right);
  }, [themeIndex]);

  const handleThemeSwitch = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

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
    } catch {
      setSummary('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  if (showLoader) {
    return <Loader onFinish={() => setShowLoader(false)} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-foreground animate-fade-in relative">

      {/* Theme switch icon */}
      <button
        onClick={handleThemeSwitch}
        className="absolute top-4 right-4 text-orange-500 hover:text-red-600 transition-all duration-300"
        aria-label="Toggle background theme"
      >
        <Flame size={28} />
      </button>

      {/* Curly glitter divider */}
      <div className="curly-divider">
        <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--left-color)" />
              <stop offset="100%" stopColor="var(--right-color)" />
            </linearGradient>
          </defs>
          <path
            d="
              M50,0
              C90,80 10,160 50,240
              C90,320 10,400 50,480
              C90,560 10,640 50,720
              C90,800 10,880 50,960
              C90,1040 10,1120 50,1200
            "
          />
        </svg>
      </div>

      {/* Title with internal shimmer effect only on text */}
      <h1 className="title-glow mb-6">
        <span role="img" aria-label="rocket">🚀</span>
        <span className="title-text">Blog Summariser</span>
      </h1>

      {/* Input and button container with glowing border */}
      <div className="w-full max-w-xl space-y-4 bg-white/5 dark:bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-lg border border-purple-500/30 glow-border">
        <Input
          placeholder="Paste blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-black/20 text-white placeholder:text-purple-300 border-purple-500 focus:ring-2 focus:ring-purple-500/70"
        />

        <Button
          onClick={handleSummarise}
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 shadow-md text-white font-semibold transition-colors duration-300"
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
