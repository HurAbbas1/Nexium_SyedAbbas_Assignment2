'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1.5, delay: 4 }}
    >
      <motion.div
        className="text-4xl font-bold neon-flicker relative"
        animate={{ scale: [1, 1.1, 0.95, 1], opacity: [0.9, 1, 0.85, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="neon-text">🚀 Nexium AI</span>
        <motion.div
          className="absolute inset-0 bg-purple-500 blur-2xl opacity-20"
          animate={{ x: [0, 20, -20, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
