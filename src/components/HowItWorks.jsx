import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      stage: 'STAGE 01',
      title: 'Digital Ingestion',
      desc: 'Deposit your .STL, .OBJ, .3MF, or .STEP geometry into our automated slicing ingestion buffer, or select a pre-verified specimen from Series 01.'
    },
    {
      stage: 'STAGE 02',
      title: 'Parametric Calibration',
      desc: 'Select alloy grade (Architectural Matte, Prismatic Silk, Structural PETG, Elastomer TPU), specify cellular infill geometry, and adjust stratification pitch.'
    },
    {
      stage: 'STAGE 03',
      title: 'Real-Time Valuation',
      desc: 'Our slicing engine simulates Bambu toolhead kinematics, calculates precise gram weight, and computes transparent volume amortization tiers instantly.'
    },
    {
      stage: 'STAGE 04',
      title: 'Resonance-Damped Extrusion',
      desc: 'Printed on calibrated Bambu Lab A1 systems with active vibration compensation and dynamic flow rate calibration, followed by micrometer QA inspection.'
    }
  ];

  return (
    <section id="protocol" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto hairline-t">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block mb-2">
            Protocol // Workflow Sequence
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-[#121212] tracking-tight">
            The Digital-to-Physical Pipeline
          </h2>
        </div>
        <span className="text-xs font-mono text-[#6E6B65] uppercase">
          [Zero Quoting Latency // Direct Slicing]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.stage}
            className="p-6 bg-[#FAF9F5] hairline-border flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-[#E63920] uppercase tracking-widest block mb-4">
                {step.stage}
              </span>
              <h3 className="font-syne font-bold text-lg text-[#121212] mb-3">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-[#6E6B65] leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="mt-8 pt-3 hairline-t text-[10px] font-mono text-[#121212]/60 uppercase">
              Bambu Calibrated
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
