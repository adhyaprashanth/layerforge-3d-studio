import React from 'react';

export function RedSealCircle({ text = 'BENGALURU POST // CALIBRATED', subtext = '256mm³', className = '' }) {
  return (
    <div className={`stamp-seal-circle w-20 h-20 text-[8px] leading-tight text-center rotate-[-12deg] p-1.5 ${className}`}>
      <div>
        <span className="block font-black tracking-widest text-[#D9251D] text-[7px]">{text}</span>
        <div className="w-6 h-[1px] bg-[#D9251D] mx-auto my-0.5" />
        <span className="block text-[6px] tracking-widest opacity-80">{subtext}</span>
      </div>
    </div>
  );
}

export function RedSealSquare({ label = 'BAMBU A1', sub = 'INSPECTION 01', className = '' }) {
  return (
    <div className={`stamp-seal-square rotate-[4deg] ${className}`}>
      <span className="block text-[9px] font-black">{label}</span>
      <span className="block text-[7px] tracking-widest opacity-80">{sub}</span>
    </div>
  );
}

export function BarcodeWidget({ code = '9 780009 500621', indexNum = '1' }) {
  return (
    <div className="flex items-end gap-3 font-mono">
      <span className="text-sm font-bold text-[#111111]">{indexNum}</span>
      <div>
        <div className="barcode-lines" />
        <span className="text-[8px] font-mono tracking-widest text-[#111111] block mt-0.5">{code}</span>
      </div>
    </div>
  );
}
