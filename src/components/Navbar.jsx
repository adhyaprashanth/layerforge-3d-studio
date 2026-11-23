import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-baseline gap-3">
          <a href="#" className="font-bebas text-3xl tracking-wide text-[#111111] hover:opacity-80 transition-opacity flex items-center select-none">
            plyon labs
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF2D78] ml-1.5 self-center shadow-[0_0_8px_rgba(255,45,120,0.6)]"></span>
          </a>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#6B6862] uppercase">
            [BENGALURU ATELIER // 560038]
          </span>
        </div>

        {/* Minimal Editorial Nav: Catalog first, then Upload */}
        <nav className="flex items-center gap-6 sm:gap-8 text-[11px] font-mono uppercase tracking-widest text-[#111111]">
          <a href="#catalog-section" className="hover:text-[#D9251D] transition-colors font-bold">
            01 / Catalog
          </a>
          <a href="#upload-section" className="hover:text-[#D9251D] transition-colors font-bold">
            02 / Upload STL
          </a>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-block text-[10px] font-mono uppercase tracking-wider text-[#D9251D] font-bold border border-[#D9251D] px-2 py-0.5">
            Bengaluru Post / Porter
          </span>

          <button
            onClick={onOpenCart}
            className="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Queue ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
