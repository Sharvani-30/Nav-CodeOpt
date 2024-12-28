import React from 'react';
import { Share2, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-14 bg-zinc-900/50 backdrop-blur-md border-b border-white/10 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CodeX
        </h1>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Share2 className="h-5 w-5 text-white/80" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
            <User className="h-5 w-5 text-white/80" />
            <span className="text-sm text-white/80">John Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
}