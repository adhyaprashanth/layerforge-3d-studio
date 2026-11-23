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
    <div className="w-full">
      {/* Toast Notice */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#F4F1EA] px-5 py-3 border border-[#111111] shadow-2xl flex items-center gap-3 font-mono text-xs">
          <Check className="w-4 h-4 text-[#D9251D]" />
          <span>Specimen <strong>{addedItemNotice}</strong> added to commission queue.</span>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between border-b border-[#111111] pb-4 mb-8">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Curated Prints' },
            { id: 'd2c', label: 'Sculptural & Art' },
            { id: 'b2b', label: 'B2B Technical' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#111111] text-[#F4F1EA] font-bold'
                  : 'bg-[#FAF8F3] text-[#111111] border border-[#111111]/30 hover:border-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="hidden sm:inline-block text-[11px] font-mono text-[#6B6862] uppercase tracking-wider">
          {filteredItems.length} Verified Models Available
        </span>
      </div>

      {/* Grid of Objects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAF8F3] border border-[#111111] flex flex-col justify-between group hover:border-[#D9251D] transition-colors"
          >
            <div>
              {/* Image Frame */}
              <div className="relative h-72 w-full overflow-hidden bg-[#EFECE4] border-b border-[#111111]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Archival Code Tag */}
                <div className="absolute top-4 left-4 bg-[#FAF8F3] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#111111] border border-[#111111]">
                  {item.code}
                </div>

                {/* Edition Pill */}
                <div className="absolute top-4 right-4 bg-[#111111]/90 text-[#F4F1EA] backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider">
                  {item.edition}
                </div>

                {/* Floating Specs Bar */}
                <div className="absolute bottom-3 left-4 right-4 bg-[#FAF8F3]/95 backdrop-blur-md p-2 border border-[#111111] flex items-center justify-between text-[10px] font-mono text-[#6B6862]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D9251D]" /> {item.printTime}
                  </span>
                  <span>{item.weight}</span>
                  <span className="text-[#111111] font-semibold">{item.dimensions}</span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9251D] block mb-1">
                  {item.series}
                </span>
                <h3 className="font-bebas text-3xl text-[#111111] tracking-wide group-hover:text-[#D9251D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#6B6862] mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Material Pill */}
                <div className="mt-4 pt-3 border-t border-[#111111]/15 flex items-center justify-between text-[11px] font-mono text-[#111111]">
                  <span className="text-[#6B6862]">Material:</span>
                  <span className="font-semibold">{item.material}</span>
                </div>

                {item.volumeDiscount && (
                  <div className="mt-2 text-[10px] font-mono text-[#D9251D]">
                    ↳ {item.volumeDiscount}
                  </div>
                )}
              </div>
            </div>

            {/* Price & Acquisition Bar */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#111111]/10 mt-2">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#6B6862] block">Price</span>
                <span className="font-bebas text-3xl text-[#111111]">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => handleQuickAdd(item)}
                className="px-4 py-2.5 bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] font-mono uppercase tracking-wider text-[11px] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Add to Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
