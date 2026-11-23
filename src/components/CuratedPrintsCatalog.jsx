import React, { useState } from 'react';
import { CURATED_CATALOG } from '../data/catalog';
import { Clock, ArrowRight, Check } from 'lucide-react';

export default function CuratedPrintsCatalog({ catalogItems, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const itemsToDisplay = catalogItems || CURATED_CATALOG;

  const filteredItems = itemsToDisplay.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'd2c') return item.category === 'd2c';
    if (activeFilter === 'b2b') return item.category === 'b2b';
    return true;
  });

  const handleQuickAdd = (item) => {
    const orderItem = {
      id: item.id + '-' + Date.now(),
      title: item.title,
      material: item.material,
      color: 'Standard Mineral',
      infill: '25%',
      layerHeight: '0.16mm',
      quantity: 1,
      estimatedTime: item.printTime,
      weight: item.weight,
      unitPrice: item.price,
      totalPrice: item.price,
      isMultiColor: item.category === 'd2c'
    };
    onAddToCart(orderItem);

    setAddedItemNotice(item.title);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2800);
  };

  return (
    <section id="archival-objects" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto hairline-t">
      {/* Toast Notice */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-[#F6F5F1] px-5 py-3 hairline-border shadow-2xl flex items-center gap-3 font-mono text-xs">
          <Check className="w-4 h-4 text-[#E63920]" />
          <span>Specimen <strong>{addedItemNotice}</strong> added to commission queue.</span>
        </div>
      )}

      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block mb-2">
            Series 01 // Curated Output
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-[#121212] tracking-tight">
            Archival Objects & Calibrated Assemblies
          </h2>
          <p className="text-sm font-mono text-[#6E6B65] mt-2 max-w-xl">
            Pre-sliced, verified geometries engineered for high-speed Bambu Lab A1 resonance damping and multi-channel extrusion. Ready for express courier across Bangalore and Pan-India.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b hairline-border pb-1">
          {[
            { id: 'all', label: 'All Series' },
            { id: 'd2c', label: 'Sculptural & Art' },
            { id: 'b2b', label: 'B2B Technical' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                activeFilter === tab.id
                  ? 'border-b-2 border-[#121212] text-[#121212] font-semibold'
                  : 'text-[#6E6B65] hover:text-[#121212]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Objects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="gallery-card bg-[#FAF9F5] hairline-border flex flex-col justify-between group"
          >
            <div>
              {/* Image Frame */}
              <div className="relative h-72 w-full overflow-hidden bg-[#EFECE4]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Archival Code Tag */}
                <div className="absolute top-4 left-4 bg-[#F6F5F1] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#121212] hairline-border">
                  {item.code}
                </div>

                {/* Edition Pill */}
                <div className="absolute top-4 right-4 bg-[#121212]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#F6F5F1]">
                  {item.edition}
                </div>

                {/* Floating Specs Bar */}
                <div className="absolute bottom-3 left-4 right-4 bg-[#F6F5F1]/95 backdrop-blur-md p-2 hairline-border flex items-center justify-between text-[10px] font-mono text-[#6E6B65]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E63920]" /> {item.printTime}
                  </span>
                  <span>{item.weight}</span>
                  <span className="text-[#121212]">{item.dimensions}</span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block mb-1">
                  {item.series}
                </span>
                <h3 className="font-syne font-bold text-xl text-[#121212] tracking-tight group-hover:text-[#E63920] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6E6B65] mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Material Pill */}
                <div className="mt-4 pt-3 hairline-t flex items-center justify-between text-[11px] font-mono text-[#121212]">
                  <span className="text-[#6E6B65]">Specification:</span>
                  <span className="font-semibold">{item.material}</span>
                </div>

                {item.volumeDiscount && (
                  <div className="mt-2 text-[10px] font-mono text-[#E63920]">
                    ↳ {item.volumeDiscount}
                  </div>
                )}
              </div>
            </div>

            {/* Price & Acquisition Bar */}
            <div className="p-6 pt-0 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6E6B65] block">Valuation</span>
                <span className="font-syne font-black text-2xl text-[#121212]">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => handleQuickAdd(item)}
                className="px-4 py-2.5 bg-[#121212] text-[#F6F5F1] hover:bg-[#E63920] font-mono uppercase tracking-wider text-[11px] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Acquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
