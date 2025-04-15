import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TypewriterWelcome() {
  const [displayedName, setDisplayedName] = useState('');
  const userName = 'AgentX';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= userName.length) {
        setDisplayedName(userName.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-300 space-y-6">
      <motion.h1 
        className="text-6xl font-extrabold font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome{" "}
        <span className="bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent animate-gradient">
          {displayedName}
        </span>
        <span className="animate-pulse">|</span>
      </motion.h1>
      <motion.p 
        className="text-xl text-zinc-400 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        "Great code isn't written, it's rewritten. Let's make something extraordinary!"
      </motion.p>
      <motion.p 
        className="text-base text-zinc-500 italic font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Start your conversation below to optimize your code.
      </motion.p>
    </div>
  );
}