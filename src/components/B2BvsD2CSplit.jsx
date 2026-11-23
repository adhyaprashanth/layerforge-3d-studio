import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Scale, Cpu, Layers } from 'lucide-react';

export default function B2BvsD2CSplit() {
  const [activeTab, setActiveTab] = useState('b2b');

  return (
    <section id="dual-atelier" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto hairline-t">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block mb-2">
            Discipline // Dual Atelier Model
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-[#121212] tracking-tight">
            Precision Tooling Meets Bespoke Artifacts
          </h2>
          <p className="text-xs font-mono text-[#6E6B65] mt-2">
            Tailored for Bangalore's hardware founders, EV/drone engineers, and creative digital makers.
          </p>
        </div>

        {/* Minimal Tab Switcher */}
        <div className="flex items-center gap-2 border-b hairline-border pb-1">
          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === 'b2b'
                ? 'border-b-2 border-[#121212] text-[#121212] font-bold'
                : 'text-[#6E6B65] hover:text-[#121212]'
            }`}
          >
            01 / Bangalore B2B & Hardware
          </button>
          <button
            onClick={() => setActiveTab('d2c')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === 'd2c'
                ? 'border-b-2 border-[#121212] text-[#121212] font-bold'
                : 'text-[#6E6B65] hover:text-[#121212]'
            }`}
          >
            02 / Bespoke Creative Commissions
          </button>
        </div>
      </div>

      {/* Content Panes */}
      {activeTab === 'b2b' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#FAF9F5] hairline-border p-8 md:p-12">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
              Phase 01-A // Hardware Startups, EV & Robotics Pilot Runs
            </span>
            <h3 className="font-syne font-bold text-2xl md:text-4xl text-[#121212] leading-tight">
              Circumvent 3-Week Tooling Lead Times. Validate Physical Hardware in Bangalore Tomorrow.
            </h3>
            <p className="text-sm font-mono text-[#6E6B65] leading-relaxed">
              Traditional injection molding requires ₹3L+ tooling and multi-week overseas freight. plyon labs operates a calibrated Bambu Lab A1 fleet in Bangalore delivering ±0.15mm dimensional verification, functional heat resistance up to 75°C, and small-batch pilot runs with zero tooling commitments.
            </p>

            {/* Technical Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 hairline-t">
              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Confidentiality & Mutual NDA
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Your CAD files and intellectual property remain strictly sequestered on encrypted local storage with formal mutual non-disclosure execution under Indian law.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // GST Tax Invoicing & ITC
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Formal tax invoices with 18% GST (HSN 8477) and GSTIN registration for seamless Input Tax Credit for Indian corporations and startups.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Structural High-Impact PETG
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Withstands Bangalore ambient testing up to 75°C, high tensile snap-fit elasticity, and outdoor UV durability for EV and drone fixtures.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Bengaluru Post & Porter Delivery
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Same-day Porter courier or speed dispatch via Bengaluru Post to Koramangala, Indiranagar, HSR Layout, Whitefield, Peenya, and Electronic City.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] text-[#F6F5F1] hover:bg-[#E63920] font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <span>Upload Technical CAD Archive</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Machine Spec Placard */}
          <div className="lg:col-span-5 bg-[#F6F5F1] p-6 hairline-border font-mono text-xs space-y-4">
            <span className="text-[10px] uppercase text-[#E63920] tracking-widest block">
              Calibration Protocol // Bambu Lab A1
            </span>
            <div className="space-y-3">
              <div className="flex justify-between py-2 hairline-b">
                <span className="text-[#6E6B65]">Dimensional Tolerance</span>
                <span className="font-semibold text-[#121212]">±0.15mm (Active Flow Compensation)</span>
              </div>
              <div className="flex justify-between py-2 hairline-b">
                <span className="text-[#6E6B65]">Maximum Build Envelope</span>
                <span className="font-semibold text-[#121212]">256 × 256 × 256 mm</span>
              </div>
              <div className="flex justify-between py-2 hairline-b">
                <span className="text-[#6E6B65]">Stratification Pitch</span>
                <span className="font-semibold text-[#121212]">0.08mm to 0.28mm</span>
              </div>
              <div className="flex justify-between py-2 hairline-b">
                <span className="text-[#6E6B65]">Acceleration Vector</span>
                <span className="font-semibold text-[#121212]">500 mm/s Peak Resonance Damped</span>
              </div>
              <div className="flex justify-between py-2 hairline-b">
                <span className="text-[#6E6B65]">Logistics Network</span>
                <span className="font-semibold text-[#D9251D]">Only Bengaluru Post / Porter</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#FAF9F5] hairline-border p-8 md:p-12">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
              Phase 01-B // Bespoke Form & Tangible Art
            </span>
            <h3 className="font-syne font-bold text-2xl md:text-4xl text-[#121212] leading-tight">
              Multi-Channel Filament Extrusion for Intricate Sculptural Work.
            </h3>
            <p className="text-sm font-mono text-[#6E6B65] leading-relaxed">
              Designed for sculptors, digital artists, and keyboard enthusiasts. Seamlessly print complex interlocking biomorphic forms, print-in-place kinematics, and 4-color AMS color-shifting gradients without post-process pigment masking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 hairline-t">
              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // 4-Color AMS Multi-Material
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Automated material switching directly within individual layers for multi-pigment artifacts and clean accent contours.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Prismatic Silk Surface
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Chameleon two-tone filaments exhibiting subtle specular reflections across organic, continuous curvature.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Single-Piece Commissions
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Zero setup surcharge for single bespoke commissions. Individual pieces start transparently from ₹399.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#121212] font-semibold block mb-1">
                  // Express 24h Turnaround
                </span>
                <p className="text-xs text-[#6E6B65] leading-relaxed">
                  Single-piece geometric commissions slice, print, and undergo deburring within 24 hours of confirmation.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#archival-objects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] text-[#F6F5F1] hover:bg-[#E63920] font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <span>Browse Curated Series 01</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F6F5F1] p-6 hairline-border font-mono text-xs space-y-4">
            <span className="text-[10px] uppercase text-[#E63920] tracking-widest block">
              Curated Output // Frequently Commissioned
            </span>
            <ul className="space-y-3">
              <li className="p-3 hairline-border bg-white">
                <span className="font-semibold text-[#121212] block">Biomorphic Kinetic Serpents & Dragons</span>
                <span className="text-[11px] text-[#6E6B65]">Print-in-place multi-articulated vertebrate joints</span>
              </li>
              <li className="p-3 hairline-border bg-white">
                <span className="font-semibold text-[#121212] block">Algorithmic Voronoi & Parametric Vessels</span>
                <span className="text-[11px] text-[#6E6B65]">Dual-shell porous architectural decorative forms</span>
              </li>
              <li className="p-3 hairline-border bg-white">
                <span className="font-semibold text-[#121212] block">Artisan Sculptural Keycap Monoliths</span>
                <span className="text-[11px] text-[#6E6B65]">0.08mm layer pitch for tactile friction-fit stems</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
