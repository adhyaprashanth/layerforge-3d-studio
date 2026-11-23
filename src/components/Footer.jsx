import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#EFECE4] hairline-t text-[#111111] py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Monogram Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="font-bebas text-4xl tracking-wide text-[#111111] flex items-center">
            plyon labs
            <span className="inline-block w-3 h-3 rounded-full bg-[#FF2D78] ml-1.5 shadow-[0_0_8px_rgba(255,45,120,0.6)]"></span>
          </div>
          <p className="text-xs font-mono text-[#6B6862] leading-relaxed max-w-sm">
            Haute additive fabrication atelier based in Bengaluru, Karnataka. Operating calibrated Bambu Lab A1 hardware for precision engineering prototypes and bespoke 3D prints.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#111111] flex flex-col gap-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D9251D]" />
              Studio: 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru 560038
            </span>
            <span className="text-[#6B6862]">
              Hardware: Bambu Lab A1 // 256×256×256mm // 4-Channel AMS
            </span>
          </div>
        </div>

        {/* Index */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#D9251D] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-[#111111]/80">
            <li><a href="#catalog-section" className="hover:text-[#D9251D] transition-colors">01 // Browse Catalog</a></li>
            <li><a href="#upload-section" className="hover:text-[#D9251D] transition-colors">02 // Upload STL File</a></li>
            <li><a href="#dual-atelier" className="hover:text-[#D9251D] transition-colors">03 // B2B Hardware</a></li>
          </ul>
        </div>

        {/* Alloys - No per gram info */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] mb-4">
            Material Specifications
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-[#121212]/80">
            <li>Architectural Matte PLA</li>
            <li>Prismatic Silk Dual-Tone</li>
            <li>Structural PETG (75°C Heat)</li>
            <li>Vulcanized Elastomer TPU 95A</li>
            <li>4-Channel Multi-Material AMS</li>
          </ul>
        </div>

        {/* Compliance & Contact */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] mb-4">
            India Compliance & Logistics
          </h4>
          <div className="space-y-2 text-xs font-mono text-[#6E6B65] leading-relaxed">
            <p className="text-[#121212] font-semibold">18% GST Invoicing (HSN 8477)</p>
            <p>Input Tax Credit (ITC) for registered companies</p>
            <p className="text-[#D9251D] font-bold">Delivery: Only Bengaluru Post / Porter</p>
            <p className="text-[#121212] pt-2">Direct engineer: +91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6E6B65] gap-4">
        <span>© 2026 plyon labs. ALL SPECIMENS CALIBRATED.</span>
        <span>PROUDLY FABRICATING IN BENGALURU, INDIA 🇮🇳</span>
      </div>
    </footer>
  );
}
