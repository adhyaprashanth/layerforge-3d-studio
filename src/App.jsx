import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AcidPosterHero from './components/AcidPosterHero';
import InstantQuoteCalculator from './components/InstantQuoteCalculator';
import CuratedPrintsCatalog from './components/CuratedPrintsCatalog';
import B2BvsD2CSplit from './components/B2BvsD2CSplit';
import OrderDrawerModal from './components/OrderDrawerModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { MATERIALS } from './data/materials';
import { CURATED_CATALOG } from './data/catalog';
import { RedSealCircle, RedSealSquare, BarcodeWidget } from './components/RedStamps';
import { Upload, ShoppingBag, Layers, Cpu, ShieldCheck, Box, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_CATALOG = 'plyon_catalog_v1';
const STORAGE_KEY_ORDERS = 'plyon_orders_v1';

export default function App() {
  // Persistent catalog state in localStorage
  const [catalogItems, setCatalogItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOG) || localStorage.getItem('layerforge_catalog_v1');
      return saved ? JSON.parse(saved) : CURATED_CATALOG;
    } catch {
      return CURATED_CATALOG;
    }
  });

  // Persistent orders state in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS) || localStorage.getItem('layerforge_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // URL-driven Admin route: /admin or #admin opens the Admin console directly
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });

  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    checkAdminRoute();

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedColor, setSelectedColor] = useState(MATERIALS[0].colors[0]);

  // Fallback CAD model specifications for instant estimator
  const [modelStats, setModelStats] = useState({
    name: 'Custom CAD Geometry Specimen',
    code: 'SPECIMEN // A1-DIRECT',
    dimensions: { x: 92, y: 84, z: 42 },
    volumeCm3: 48,
    estimatedWeight: 56,
    estimatedTimeMin: 105
  });

  // Save catalog changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(catalogItems));
    } catch (e) {
      console.error(e);
    }
  }, [catalogItems]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Admin Catalog actions
  const handleAddCatalogItem = (newItem) => {
    setCatalogItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteCatalogItem = (itemId) => {
    setCatalogItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to default curated collection?')) {
      setCatalogItems(CURATED_CATALOG);
    }
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Record incoming order from checkout drawer
  const handleNewOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#111111] flex flex-col selection:bg-[#FF2D78] selection:text-white">
      {/* Navigation - No Admin links on main webpage */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* POSTER HERO (plyon labs. with pink dot) */}
        <AcidPosterHero />

        {/* TELEMETRY RUNNING TICKER */}
        <div className="w-full bg-[#111111] text-[#F4F1EA] py-3.5 border-y border-[#111111] overflow-x-auto select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8 text-[11px] font-mono uppercase tracking-widest min-w-max">
            <span>BAMBU LAB A1 SPEED: 500 MM/S</span>
            <span className="text-[#FF2D78] font-bold">•</span>
            <span>TOLERANCE: ±0.15MM CALIBRATED</span>
            <span className="text-[#FF2D78] font-bold">•</span>
            <span>4-COLOR AUTOMATED AMS LITE</span>
            <span className="text-[#FF2D78] font-bold">•</span>
            <span className="text-[#F4F1EA] font-extrabold bg-[#D9251D] px-2 py-0.5">ONLY BENGALURU POST / PORTER</span>
            <span className="text-[#FF2D78] font-bold">•</span>
            <span>18% GST TAX INVOICE (ITC)</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 01: BROWSE CATALOG (FIRST AS REQUESTED)                */}
        {/* ============================================================== */}
        <section id="catalog-section" className="border-b border-[#111111] bg-[#F4F1EA]">
          <div className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="border border-[#111111] p-6 sm:p-8 bg-[#FAF8F3] mb-12 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="absolute top-4 right-4 hidden sm:block">
                <RedSealSquare label="PRE-SLICED" sub="READY 24H" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D9251D] font-bold mb-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>SECTION 01 // ARCHIVAL STORE</span>
                </div>
                <h2 className="font-bebas text-5xl sm:text-7xl text-[#111111] tracking-tight leading-[0.9]">
                  BROWSE CATALOG
                </h2>
                <p className="text-xs font-mono text-[#6B6862] mt-3 max-w-xl">
                  Don't have a 3D CAD model? Pick from our curated, pre-tested designs. Calibrated for Bambu Lab A1 motion dynamics and packaged for express dispatch via <strong>Bengaluru Post / Porter</strong>.
                </p>
              </div>

              <div className="font-mono text-xs flex flex-col sm:items-end gap-1">
                <span className="text-[10px] text-[#6B6862] block uppercase tracking-wider">Fast Courier:</span>
                <strong className="text-[#D9251D] uppercase">Only Bengaluru Post / Porter</strong>
              </div>
            </div>

            {/* Catalog Grid (Dynamic from State) */}
            <CuratedPrintsCatalog 
              catalogItems={catalogItems}
              onAddToCart={handleAddToCart} 
            />
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 02: UPLOAD AN STL FILE (SECOND AS REQUESTED)           */}
        {/* ============================================================== */}
        <section id="upload-section" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="border border-[#111111] p-6 sm:p-8 bg-[#FAF8F3] mb-8 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="absolute top-4 right-4 hidden sm:block">
              <RedSealCircle text="CAD INGESTION // BLR" subtext="BAMBU A1 BED" className="scale-90" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D9251D] font-bold mb-2">
                <Upload className="w-3.5 h-3.5" />
                <span>SECTION 02 // CUSTOM FABRICATION ENGINE</span>
              </div>
              <h2 className="font-bebas text-5xl sm:text-7xl text-[#111111] tracking-tight leading-[0.9]">
                UPLOAD AN STL FILE
              </h2>
              <p className="text-xs font-mono text-[#6B6862] mt-3 max-w-xl">
                Have your own 3D model? Deposit your .STL, .OBJ, .3MF, or .STEP geometry. Instant quotation, Bambu Lab A1 calibrated slicing, and rapid dispatch via <strong>Bengaluru Post / Porter</strong>.
              </p>
            </div>

            <div className="font-mono text-xs text-[#111111]">
              <span className="text-[10px] text-[#6B6862] block uppercase tracking-wider">Logistics Routing:</span>
              <strong className="text-[#D9251D] uppercase">Only Bengaluru Post / Porter</strong>
            </div>
          </div>

          {/* Slicing Terminal & Engineering Spec Board (NO MOVING GEAR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Bambu Lab A1 Engineering Spec Board */}
            <div className="lg:col-span-6 flex flex-col border border-[#111111] bg-[#FAF8F3] p-6 sm:p-8 justify-between relative">
              <div className="absolute top-3 right-4">
                <span className="font-mono text-[10px] text-[#D9251D] font-bold tracking-widest">
                  [CALIBRATION MATRIX]
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6862] mb-1">
                  SPECIFICATION ARCHITECTURE
                </div>
                <h3 className="font-bebas text-4xl text-[#111111] tracking-wide leading-none">
                  BAMBU LAB A1 DIRECT DRIVE
                </h3>
                <p className="text-xs font-mono text-[#6B6862] mt-2 leading-relaxed">
                  Precision high-speed FDM fabrication operating active vibration compensation, automatic resonance calibration, and multi-channel extrusion in Indiranagar, Bengaluru.
                </p>

                {/* Build Chamber Metric Box */}
                <div className="my-6 border border-[#111111] bg-[#111111] text-[#F4F1EA] p-6 relative">
                  <div className="flex items-center justify-between border-b border-[#F4F1EA]/20 pb-3 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#FF2D78] uppercase">
                      Active Envelope
                    </span>
                    <span className="text-xs font-mono">256 × 256 × 256 mm</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#F4F1EA]/60 uppercase block">Max Velocity</span>
                      <strong className="text-sm">500 mm/s</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#F4F1EA]/60 uppercase block">Mechanical Tolerance</span>
                      <strong className="text-sm">±0.15 mm</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#F4F1EA]/60 uppercase block">Hotend Nozzle</span>
                      <strong className="text-sm">0.4mm Hardened</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#F4F1EA]/60 uppercase block">Layer Stratification</span>
                      <strong className="text-sm">0.08mm – 0.28mm</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F4F1EA]/20 flex items-center justify-between text-[10px] font-mono text-[#F4F1EA]/80">
                    <span>AMS Multi-Color Channel</span>
                    <span className="text-[#FF2D78] font-bold">4 SPIDER FEEDS</span>
                  </div>
                </div>

                {/* Supported Geometry Types */}
                <div className="space-y-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6862]">
                    Accepted CAD Geometry
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
                    <div className="p-2 border border-[#111111] bg-[#F4F1EA]">.STL</div>
                    <div className="p-2 border border-[#111111] bg-[#F4F1EA]">.STEP</div>
                    <div className="p-2 border border-[#111111] bg-[#F4F1EA]">.OBJ</div>
                    <div className="p-2 border border-[#111111] bg-[#F4F1EA]">.3MF</div>
                  </div>
                </div>
              </div>

              {/* Bottom Stamps & Barcode */}
              <div className="pt-6 mt-6 border-t border-[#111111] flex items-center justify-between">
                <BarcodeWidget code="9 750009 500621" indexNum="A1" />
                <div className="text-right font-mono text-[10px] text-[#111111]">
                  <span className="block font-bold uppercase text-[#D9251D]">PORTER SAME-DAY READY</span>
                  <span className="text-[#6B6862]">OR BENGALURU SPEED POST</span>
                </div>
              </div>
            </div>

            {/* Right: Instant Quote Terminal (No per-gram pricing shown) */}
            <div className="lg:col-span-6 flex flex-col">
              <InstantQuoteCalculator
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                modelStats={modelStats}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>

        {/* B2B VS CREATIVE ATELIER SHOWCASE */}
        <B2BvsD2CSplit />
      </main>

      {/* Admin Panel Modal (Opens only when URL is /admin or #admin) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        catalogItems={catalogItems}
        onAddItem={handleAddCatalogItem}
        onDeleteItem={handleDeleteCatalogItem}
        onResetCatalog={handleResetCatalog}
        orders={orders}
      />

      {/* Commission Queue Drawer Modal */}
      <OrderDrawerModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleNewOrder}
      />

      {/* Footer - No Admin link */}
      <Footer />
    </div>
  );
}
