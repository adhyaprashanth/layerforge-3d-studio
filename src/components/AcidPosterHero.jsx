import React from 'react';
import { RedSealCircle, RedSealSquare, BarcodeWidget } from './RedStamps';
import { Upload, ShoppingBag, ArrowDownRight, ArrowRight } from 'lucide-react';

export default function AcidPosterHero() {
  return (
    <section className="border-b border-[#111111] bg-[#F4F1EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Main Acid Poster Grid (Faithful to Ref Pic) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#111111] bg-[#F4F1EA] relative">
          
          {/* LEFT POSTER PANEL */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#111111] p-6 sm:p-8 flex flex-col justify-between relative">
            {/* Top Red Stamp Overlap */}
            <div className="absolute top-2 right-4 sm:right-8 z-20 pointer-events-none">
              <RedSealCircle text="ARCHITECTURAL FORM // BLR" subtext="BAMBU A1" className="scale-110 sm:scale-125" />
            </div>

            {/* Giant Title */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B6862] uppercase tracking-widest mb-1">
                <span>[ADDITIVE FABRICATION // ATELIER]</span>
                <span className="crosshair-plus mr-12 sm:mr-24" />
              </div>
              <h1 className="font-bebas text-7xl sm:text-9xl tracking-tight text-[#111111] leading-[0.88] select-none">
                LAYERFORGE
              </h1>
            </div>

            {/* Central B&W Architectural 3D Print Image */}
            <div className="my-6 border border-[#111111] bg-[#111111] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" 
                alt="Architectural 3D Printed Lattice Form" 
                className="w-full h-64 sm:h-80 object-cover acid-img"
              />
              <div className="absolute bottom-2 left-3 bg-[#111111]/90 text-[#F4F1EA] text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">
                Lattice Arch // 0.12mm Stratification
              </div>
            </div>

            {/* Giant Bottom Block */}
            <div className="relative pt-2">
              <div className="absolute -top-6 right-2 sm:right-6 z-20 pointer-events-none">
                <RedSealSquare label="BENGALURU POST" sub="PORTER DIRECT" />
              </div>
              <h2 className="font-bebas text-6xl sm:text-8xl tracking-tight text-[#111111] leading-[0.88] select-none">
                STRUCTURAL SYNTHESIS
              </h2>
            </div>
          </div>

          {/* RIGHT POSTER PANEL */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#F4F1EA] relative">
            {/* Top Right Reticle & Image */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B6862] uppercase tracking-widest mb-2">
                <span className="text-[14px]">⌜ ⌝</span>
                <span className="text-[#D9251D] font-bold">ONLY BENGALURU POST / PORTER</span>
                <span className="crosshair-plus" />
              </div>

              {/* Upper Right Image Box */}
              <div className="border border-[#111111] bg-[#111111] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" 
                  alt="Parametric 3D Sculpture" 
                  className="w-full h-44 sm:h-52 object-cover acid-img"
                />
                <div className="absolute top-2 right-2 z-10">
                  <RedSealCircle text="PRECISION ±0.15MM" subtext="QC PASS" className="scale-75" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#111111] uppercase tracking-widest py-1 border-b border-[#111111]/20">
                <span>Algorithmic Mesh</span>
                <span className="font-bold">INDEX ↓ 2</span>
              </div>
            </div>

            {/* Middle Grid Row with Two Prints */}
            <div className="my-6 grid grid-cols-2 gap-3 relative">
              <div className="border border-[#111111] bg-[#111111] h-36 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
                  alt="Kinetic Print" 
                  className="w-full h-full object-cover acid-img"
                />
              </div>
              <div className="border border-[#111111] bg-[#111111] h-36 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" 
                  alt="Mechanical Enclosure" 
                  className="w-full h-full object-cover acid-img"
                />
              </div>
              <div className="col-span-2 flex justify-between items-center text-[10px] font-mono text-[#111111] uppercase tracking-widest">
                <span>. # ' ' . 0 0 '</span>
                <span className="font-bold">INDEX ↓ 3</span>
              </div>
            </div>

            {/* Barcode & Index Footnote */}
            <div className="pt-4 border-t border-[#111111] flex items-end justify-between">
              <BarcodeWidget code="9 750009 500621" indexNum="1" />
              <BarcodeWidget code="9 750025 509003" indexNum="2" />
            </div>
          </div>
        </div>

        {/* TWO PRIMARY ACTION SECTIONS CALLOUT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Card 1: Upload STL */}
          <a
            href="#upload-section"
            className="p-6 border-2 border-[#111111] bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] hover:border-[#D9251D] transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D9251D] group-hover:text-white">
                <Upload className="w-3.5 h-3.5" />
                <span>SECTION 01</span>
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide mt-1">
                UPLOAD AN STL FILE
              </h3>
              <p className="text-xs font-mono opacity-80 mt-1">
                Instant real-time slicing calculation, material pricing in ₹, and 24h dispatch.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-2 transition-transform" />
          </a>

          {/* Card 2: Browse Catalog */}
          <a
            href="#catalog-section"
            className="p-6 border-2 border-[#111111] bg-[#F4F1EA] text-[#111111] hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D9251D]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SECTION 02</span>
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide mt-1">
                BROWSE CATALOG
              </h3>
              <p className="text-xs font-mono opacity-80 mt-1">
                Curated, verified 3D prints (kinetic sculptures, dragons, tech enclosures).
              </p>
            </div>
            <ArrowDownRight className="w-6 h-6 shrink-0 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
