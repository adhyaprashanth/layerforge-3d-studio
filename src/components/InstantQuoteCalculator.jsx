import React, { useState } from 'react';
import { Upload, ArrowRight, FileCheck, Check } from 'lucide-react';
import { MATERIALS } from '../data/materials';

export default function InstantQuoteCalculator({ 
  selectedMaterial, 
  setSelectedMaterial, 
  selectedColor, 
  setSelectedColor,
  modelStats,
  onAddToCart
}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [infill, setInfill] = useState(20);
  const [layerHeight, setLayerHeight] = useState('0.20');
  const [quantity, setQuantity] = useState(1);
  const [isMultiColor, setIsMultiColor] = useState(false);
  const [isRushOrder, setIsRushOrder] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        sizeMb: (file.size / (1024 * 1024)).toFixed(2)
      });
    }
  };

  const baseWeight = modelStats?.estimatedWeight || 50;
  const infillMultiplier = 0.7 + (infill / 100) * 0.7;
  const adjustedWeight = Math.round(baseWeight * infillMultiplier);
  
  const layerMultiplier = layerHeight === '0.08' ? 1.7 : layerHeight === '0.12' ? 1.35 : layerHeight === '0.20' ? 1.0 : 0.85;
  const estimatedTimeHours = (((modelStats?.estimatedTimeMin || 90) * infillMultiplier * layerMultiplier) / 60).toFixed(1);

  // INR Economics for Bangalore printing hub
  const pricePerGram = selectedMaterial.basePricePerGram; // ₹10 - ₹18/g
  const materialCost = adjustedWeight * pricePerGram;
  
  // Machine cost (₹120/hour for high speed Bambu Lab A1)
  const machineCost = Number(estimatedTimeHours) * 120;
  const multiColorCost = isMultiColor ? 250 : 0;
  const rushFee = isRushOrder ? 350 : 0;

  const singleUnitCost = Math.max(399, materialCost + machineCost + multiColorCost + rushFee);

  let discountPercent = 0;
  if (quantity >= 50) discountPercent = 0.35;
  else if (quantity >= 20) discountPercent = 0.25;
  else if (quantity >= 10) discountPercent = 0.18;
  else if (quantity >= 5) discountPercent = 0.10;

  const discountedUnitCost = Math.round(singleUnitCost * (1 - discountPercent));
  const totalCost = Math.round(discountedUnitCost * quantity);

  const handleOrder = () => {
    const orderItem = {
      id: 'custom-' + Date.now(),
      title: uploadedFile ? uploadedFile.name : modelStats.name,
      material: selectedMaterial.name,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      infill: `${infill}%`,
      layerHeight: `${layerHeight}mm`,
      quantity: quantity,
      estimatedTime: `${estimatedTimeHours} hrs`,
      weight: `${adjustedWeight}g`,
      unitPrice: discountedUnitCost,
      totalPrice: totalCost,
      isMultiColor,
      isRushOrder
    };
    onAddToCart(orderItem);
  };

  return (
    <div className="bg-[#FAF9F5] hairline-border p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Terminal Header */}
        <div className="flex items-baseline justify-between pb-4 hairline-b">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
              Phase 01 // Configuration
            </span>
            <h3 className="font-syne font-bold text-xl text-[#121212] tracking-tight">
              Commission Terminal
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#6E6B65] uppercase">
            [Bangalore Hub // Queue 24h]
          </span>
        </div>

        {/* STEP 1: Ingestion */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#6E6B65] mb-2">
            <span>01 / CAD Ingestion</span>
            <span>.STL, .OBJ, .3MF, .STEP</span>
          </div>

          <div className="relative border border-dashed border-[#121212]/30 hover:border-[#121212] p-4 text-center cursor-pointer transition-colors bg-[#F6F5F1]">
            <input 
              type="file" 
              accept=".stl,.obj,.3mf,.step" 
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            {uploadedFile ? (
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#121212]">
                <FileCheck className="w-4 h-4 text-[#E63920]" />
                <span className="font-semibold">{uploadedFile.name}</span>
                <span className="text-[#6E6B65]">({uploadedFile.sizeMb} MB)</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Upload className="w-4 h-4 text-[#121212]/60" />
                <span className="text-xs font-mono text-[#121212]">
                  Drop CAD geometry or calibrate active specimen
                </span>
              </div>
            )}
          </div>
        </div>

        {/* STEP 2: Material Selection */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#6E6B65] mb-2">
            <span>02 / Material Alloy</span>
            <span className="text-[#121212] font-semibold">{selectedMaterial.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MATERIALS.map((mat) => {
              const isSelected = selectedMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => {
                    setSelectedMaterial(mat);
                    setSelectedColor(mat.colors[0]);
                  }}
                  className={`p-3 text-left hairline-border transition-all ${
                    isSelected
                      ? 'bg-[#121212] text-white'
                      : 'bg-[#F6F5F1] text-[#121212] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">{mat.code}</span>
                    <span className="text-[10px] font-mono uppercase opacity-75">{mat.id.toUpperCase()}</span>
                  </div>
                  <h4 className="font-syne font-semibold text-xs mt-1 truncate">{mat.name}</h4>
                  <p className="text-[10px] font-mono opacity-60 mt-0.5 truncate">{mat.finish}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Tones */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#6E6B65] mb-2">
            <span>Pigment: <strong className="text-[#121212]">{selectedColor.name}</strong></span>
            <span>{selectedMaterial.colors.length} in stock</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedMaterial.colors.map((c) => {
              const isColorSelected = selectedColor.name === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border transition-transform relative ${
                    isColorSelected
                      ? 'border-[#121212] scale-125 ring-2 ring-[#E63920]'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {isColorSelected && (
                    <Check className="w-3 h-3 absolute inset-0 m-auto text-black" style={{ color: c.textColor }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Structural Infill & Stratification */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline text-[11px] font-mono uppercase text-[#6E6B65] mb-1.5">
              <span>03 / Infill Density</span>
              <span className="text-[#121212] font-semibold">{infill}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={infill}
              onChange={(e) => setInfill(Number(e.target.value))}
              className="w-full accent-[#121212] h-1.5 bg-[#121212]/10 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-[#6E6B65] mt-1">
              <span>Display (15%)</span>
              <span>Solid (100%)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-[11px] font-mono uppercase text-[#6E6B65] mb-1.5">
              <span>Stratification Pitch</span>
              <span className="text-[#121212] font-semibold">{layerHeight}mm</span>
            </div>
            <select
              value={layerHeight}
              onChange={(e) => setLayerHeight(e.target.value)}
              className="w-full bg-[#F6F5F1] hairline-border p-1.5 text-xs font-mono text-[#121212] focus:outline-none"
            >
              <option value="0.28">0.28mm // Draft Velocity</option>
              <option value="0.20">0.20mm // Standard Calibrated</option>
              <option value="0.12">0.12mm // High Definition</option>
              <option value="0.08">0.08mm // Resin-Grade Fine</option>
            </select>
          </div>
        </div>

        {/* Modifiers */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsMultiColor(!isMultiColor)}
            className={`p-2.5 hairline-border text-left transition-colors flex items-center justify-between text-xs font-mono ${
              isMultiColor ? 'bg-[#121212] text-white' : 'bg-[#F6F5F1] text-[#121212] hover:bg-black/5'
            }`}
          >
            <span>4-Color AMS Feed</span>
            <span className="text-[10px] opacity-70">+₹250</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRushOrder(!isRushOrder)}
            className={`p-2.5 hairline-border text-left transition-colors flex items-center justify-between text-xs font-mono ${
              isRushOrder ? 'bg-[#121212] text-white' : 'bg-[#F6F5F1] text-[#121212] hover:bg-black/5'
            }`}
          >
            <span>Porter Express Priority</span>
            <span className="text-[10px] opacity-70">+₹350</span>
          </button>
        </div>

        {/* Volume & Quantity */}
        <div className="mt-5 p-3 hairline-border bg-[#F6F5F1] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6E6B65] block">Batch Run</span>
            {discountPercent > 0 ? (
              <span className="text-xs font-mono text-[#E63920] font-semibold">
                Bangalore B2B Tier: -{Math.round(discountPercent * 100)}% Applied
              </span>
            ) : (
              <span className="text-xs font-mono text-[#121212]">Tier discounts from 5+ units</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 bg-white hairline-border font-mono text-sm flex items-center justify-center hover:bg-black/5"
            >
              -
            </button>
            <span className="w-8 text-center font-mono font-bold text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 bg-white hairline-border font-mono text-sm flex items-center justify-center hover:bg-black/5"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Quote Summary & Commission CTA */}
      <div className="mt-6 pt-5 hairline-t">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6B65] block">
              Total Fabrication Valuation
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-syne font-black text-3xl md:text-4xl text-[#121212]">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
              {quantity > 1 && (
                <span className="text-xs font-mono text-[#6E6B65]">(₹{discountedUnitCost}/unit)</span>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#6E6B65] block mt-0.5">
              + 18% GST (Input Tax Credit eligible)
            </span>
          </div>
          <div className="text-right text-[11px] font-mono text-[#6E6B65]">
            <span>Est. Print: <strong className="text-[#121212]">{estimatedTimeHours}h</strong></span>
            <span className="block">Mass: <strong className="text-[#121212]">{adjustedWeight * quantity}g</strong></span>
          </div>
        </div>

        <button
          onClick={handleOrder}
          className="w-full py-4 bg-[#121212] text-[#F6F5F1] hover:bg-[#E63920] font-mono uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Commission This Specimen</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#6E6B65] uppercase">
          <span>Tolerance: ±0.15mm Calibrated</span>
          <span>Zero Minimum Commission</span>
        </div>
      </div>
    </div>
  );
}
