'use client';

import Link from 'next/link';
import { ShieldAlert, Compass, BookOpen, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-museum-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldAlert className="w-6 h-6 text-museum-red transition-transform group-hover:scale-110" />
          <span className="font-bold text-lg tracking-wider uppercase text-white">
            Museum of <span className="text-museum-red">Banned</span> Design
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/galleries" className="flex items-center gap-2 text-sm text-museum-muted hover:text-white transition">
            <Compass className="w-4 h-4" /> Galleries
          </Link>
          <Link href="/exhibits" className="flex items-center gap-2 text-sm text-museum-muted hover:text-white transition">
            <BookOpen className="w-4 h-4" /> All Exhibits
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-sm bg-museum-red/10 border border-museum-red/30 text-museum-red px-4 py-2 rounded-md hover:bg-museum-red hover:text-white transition"
          >
            <User className="w-4 h-4" /> Enter Vault
          </Link>
        </div>

      </div>
    </header>
  );
}