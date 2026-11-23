export const MATERIALS = [
  {
    id: 'pla-architectural',
    code: 'MAT-01',
    name: 'Architectural Matte PLA',
    finish: 'Ultra-Matte Mineral Texture',
    basePricePerGram: 10, // ₹10 per gram
    density: 1.24,
    deflectionTemp: '55°C',
    tensileStr: '65 MPa',
    description: 'Zero specular shine, museum-grade surface smoothness. Ideal for spatial models, sculptural artifacts, and tactile display pieces.',
    colors: [
      { name: 'Basalt Obsidian', hex: '#1C1C1E', textColor: '#FFFFFF' },
      { name: 'Raw Chalk', hex: '#F0ECE1', textColor: '#121212' },
      { name: 'Yves Klein Ultramarine', hex: '#002FA7', textColor: '#FFFFFF' },
      { name: 'Vermillion Red', hex: '#E63920', textColor: '#FFFFFF' },
      { name: 'Sandstone Ochre', hex: '#D7C9B1', textColor: '#121212' },
      { name: 'Forest Lichen', hex: '#2F4F4F', textColor: '#FFFFFF' }
    ]
  },
  {
    id: 'silk-prismatic',
    code: 'MAT-02',
    name: 'Prismatic Silk Alloy',
    finish: 'Directional Metallic Sheen',
    basePricePerGram: 14, // ₹14 per gram
    density: 1.25,
    deflectionTemp: '55°C',
    tensileStr: '58 MPa',
    description: 'Dual-tone color shifting filament that catches ambient lighting dynamically. Engineered for kinetic sculptures and complex organic curvature.',
    colors: [
      { name: 'Liquid Sterling Silver', hex: '#E2E8F0', textColor: '#121212' },
      { name: 'Molten Bronze', hex: '#A3683A', textColor: '#FFFFFF' },
      { name: 'Chameleon Violet / Gold', hex: '#6D28D9', textColor: '#FFFFFF' },
      { name: 'Deep Sea Emerald', hex: '#065F46', textColor: '#FFFFFF' }
    ]
  },
  {
    id: 'petg-structural',
    code: 'MAT-03',
    name: 'Structural High-Impact PETG',
    finish: 'Semi-Matte Technical Grade',
    basePricePerGram: 13, // ₹13 per gram
    density: 1.27,
    deflectionTemp: '75°C (Indian Ambient Heat Tested)',
    tensileStr: '78 MPa',
    description: 'High impact resilience, chemical tolerance, and thermal stability up to 75°C. Formulated for EV brackets, drone frames, sensor jigs, and Bangalore hardware pilot runs.',
    colors: [
      { name: 'Industrial Black', hex: '#0F172A', textColor: '#FFFFFF' },
      { name: 'Translucent Smoked Glass', hex: '#64748B', textColor: '#FFFFFF' },
      { name: 'Safety Ochre', hex: '#D97706', textColor: '#FFFFFF' }
    ]
  },
  {
    id: 'tpu-elastomer',
    code: 'MAT-04',
    name: 'Vulcanized Elastomer TPU 95A',
    finish: 'Tactile Shock-Absorbing Rubber',
    basePricePerGram: 18, // ₹18 per gram
    density: 1.21,
    deflectionTemp: '80°C',
    tensileStr: 'High Elasticity',
    description: 'High-rebound shore 95A elastomer. Completely tear-resistant, ideal for dampening mounts, drone landing pads, robot gripper fingers, and flexible gaskets.',
    colors: [
      { name: 'Matte Tire Rubber', hex: '#18181B', textColor: '#FFFFFF' },
      { name: 'Optical Frost Clear', hex: '#CBD5E1', textColor: '#121212' },
      { name: 'Signal Yellow', hex: '#EAB308', textColor: '#121212' }
    ]
  }
];
