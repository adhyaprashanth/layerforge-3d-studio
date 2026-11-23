import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AcidPosterHero from './components/AcidPosterHero';
import Hero3DViewer from './components/Hero3DViewer';
import InstantQuoteCalculator from './components/InstantQuoteCalculator';
import CuratedPrintsCatalog from './components/CuratedPrintsCatalog';
import B2BvsD2CSplit from './components/B2BvsD2CSplit';
import OrderDrawerModal from './components/OrderDrawerModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { MATERIALS } from './data/materials';
import { CURATED_CATALOG } from './data/catalog';
import { RedSealCircle, RedSealSquare } from './components/RedStamps';
import { Upload, ShoppingBag, ShieldCheck } from 'lucide-react';

const STORAGE_KEY_CATALOG = 'layerforge_catalog_v1';
const STORAGE_KEY_ORDERS = 'layerforge_orders_v1';

export default function App() {
  // Persistent catalog state in localStorage
  const [catalogItems, setCatalogItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOG);
      return saved ? JSON.parse(saved) : CURATED_CATALOG;
    } catch {
      return CURATED_CATALOG;
    }
  });

  // Persistent orders state in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedColor, setSelectedColor] = useState(MATERIALS[0].colors[0]); // Basalt Obsidian
  const [activeSampleId, setActiveSampleId] = useState('gear');
  const [modelStats, setModelStats] = useState({
    name: 'Planetary Gear Transmission',
    code: 'SPECIMEN // 01',
    dimensions: { x: 74, y: 74, z: 24 },
    volumeCm3: 41,
    estimatedWeight: 50.8,
    estimatedTimeMin: 90
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
    <div className="min-h-screen bg-[#F4F1EA] text-[#111111] flex flex-col selection:bg-[#D9251D] selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* POSTER HERO (FAITHFUL TO REF PIC) */}
        <AcidPosterHero />

        {/* TELEMETRY RUNNING TICKER */}
        <div className="w-full bg-[#111111] text-[#F4F1EA] py-3.5 border-y border-[#111111] overflow-x-auto select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8 text-[11px] font-mono uppercase tracking-widest min-w-max">
            <span>BAMBU LAB A1 SPEED: 500 MM/S</span>
            <span className="text-[#D9251D] font-bold">/</span>
            <span>TOLERANCE: ±0.15MM CALIBRATED</span>
            <span className="text-[#D9251D] font-bold">/</span>
            <span>4-COLOR AUTOMATED AMS LITE</span>
            <span className="text-[#D9251D] font-bold">/</span>
            <span className="text-[#F4F1EA] font-extrabold bg-[#D9251D] px-2 py-0.5">ONLY BENGALURU POST / PORTER</span>
            <span className="text-[#D9251D] font-bold">/</span>
            <span>18% GST TAX INVOICE (ITC)</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 01: UPLOAD AN STL FILE                                */}
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
                <span>SECTION 01 // CUSTOM FABRICATION ENGINE</span>
              </div>
              <h2 className="font-bebas text-5xl sm:text-7xl text-[#111111] tracking-tight leading-[0.9]">
                UPLOAD AN STL FILE
              </h2>
              <p className="text-xs font-mono text-[#6B6862] mt-3 max-w-xl">
                Have a 3D model? Deposit your .STL, .OBJ, .3MF, or .STEP geometry. Instant real-time volume slicing, material pricing in ₹, and rapid dispatch via <strong>Bengaluru Post / Porter</strong>.
              </p>
            </div>

            <div className="font-mono text-xs text-[#111111]">
              <span className="text-[10px] text-[#6B6862] block uppercase tracking-wider">Logistics Routing:</span>
              <strong className="text-[#D9251D] uppercase">Only Bengaluru Post / Porter</strong>
            </div>
          </div>

          {/* Interactive 3D Plinth + Slicing Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 3D Exhibition Plinth */}
            <div className="lg:col-span-7 flex flex-col">
              <Hero3DViewer
                selectedColor={selectedColor}
                activeSampleId={activeSampleId}
                onSelectSample={setActiveSampleId}
                onModelCalculated={setModelStats}
              />
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#6B6862]">
                <span>Drag to orbit geometry // Scroll to zoom plinth</span>
                <span className="text-[#111111]">Active Plinth: 256 × 256 × 256 mm</span>
              </div>
            </div>

            {/* Instant Quote Terminal */}
            <div className="lg:col-span-5 flex flex-col">
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

        {/* ============================================================== */}
        {/* SECTION 02: BROWSE CATALOG                                    */}
        {/* ============================================================== */}
        <section id="catalog-section" className="border-t border-[#111111] bg-[#F4F1EA]">
          <div className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="border border-[#111111] p-6 sm:p-8 bg-[#FAF8F3] mb-12 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="absolute top-4 right-4 hidden sm:block">
                <RedSealSquare label="PRE-SLICED" sub="READY 24H" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D9251D] font-bold mb-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>SECTION 02 // ARCHIVAL STORE</span>
                </div>
                <h2 className="font-bebas text-5xl sm:text-7xl text-[#111111] tracking-tight leading-[0.9]">
                  BROWSE CATALOG
                </h2>
                <p className="text-xs font-mono text-[#6B6862] mt-3 max-w-xl">
                  Don't have a 3D CAD model? Pick from our curated, pre-tested designs. Calibrated for Bambu A1 motion and packed for express dispatch via <strong>Bengaluru Post / Porter</strong>.
                </p>
              </div>

              <div className="font-mono text-xs flex flex-col sm:items-end gap-2">
                <div>
                  <span className="text-[10px] text-[#6B6862] block uppercase tracking-wider">Fast Courier:</span>
                  <strong className="text-[#D9251D] uppercase">Bengaluru Post / Porter</strong>
                </div>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="px-3 py-1 bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  ⚙️ Admin: Manage Catalog
                </button>
              </div>
            </div>

            {/* Catalog Grid (Dynamic from State) */}
            <CuratedPrintsCatalog 
              catalogItems={catalogItems}
              onAddToCart={handleAddToCart} 
            />
          </div>
        </section>

        {/* B2B VS CREATIVE ATELIER SHOWCASE */}
        <B2BvsD2CSplit />
      </main>

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
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

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}
