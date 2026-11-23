import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, ShoppingBag, Check, ShieldCheck, Database, RefreshCw, Eye, ArrowRight } from 'lucide-react';
import { RedSealSquare } from './RedStamps';

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  catalogItems, 
  onAddItem, 
  onDeleteItem, 
  onResetCatalog,
  orders = [],
  onUpdateOrderStatus 
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'add' | 'orders' | 'supabase'
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Form state for adding an item
  const [newItem, setNewItem] = useState({
    title: '',
    code: '',
    edition: 'First Edition // BLR',
    category: 'd2c',
    price: 699,
    printTime: '2h 15m',
    material: 'Architectural Matte PLA',
    dimensions: '80 × 80 × 60 mm',
    weight: '55g',
    description: '',
    series: 'Atelier Geometry',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  });

  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  // Simple admin passcode check (default is 1234 or instant unlock)
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin') {
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    const itemToSave = {
      ...newItem,
      id: 'custom-item-' + Date.now(),
      code: newItem.code || `OBJ-${Math.floor(100 + Math.random() * 900)}`,
      price: Number(newItem.price)
    };

    onAddItem(itemToSave);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setActiveTab('inventory');
    }, 1200);

    // Reset form
    setNewItem({
      title: '',
      code: '',
      edition: 'First Edition // BLR',
      category: 'd2c',
      price: 699,
      printTime: '2h 15m',
      material: 'Architectural Matte PLA',
      dimensions: '80 × 80 × 60 mm',
      weight: '55g',
      description: '',
      series: 'Atelier Geometry',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F3] max-w-5xl w-full border-2 border-[#111111] shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Admin Header */}
        <div className="p-6 border-b border-[#111111] bg-[#111111] text-[#F4F1EA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D9251D] flex items-center justify-center font-bebas text-lg">
              A1
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9251D] block">
                [ATELIER MANAGEMENT // BENGALURU]
              </span>
              <h3 className="font-bebas text-2xl tracking-wide">
                CATALOG & QUEUE ADMIN CONSOLE
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Password Lock Screen (Default: 1234) */}
        {!isUnlocked ? (
          <div className="p-10 text-center max-w-md mx-auto my-12">
            <div className="w-14 h-14 bg-[#111111] text-[#F4F1EA] mx-auto mb-4 flex items-center justify-center font-mono text-xl">
              🔒
            </div>
            <h4 className="font-bebas text-3xl text-[#111111] tracking-wide">
              ADMIN AUTHORIZATION
            </h4>
            <p className="text-xs font-mono text-[#6B6862] mt-1 mb-6">
              Enter owner passcode to manage catalog designs, view live customer orders, or sync database.
            </p>

            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: 1234)"
                className="w-full bg-white border-2 border-[#111111] p-3 text-center text-sm font-mono focus:outline-none"
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs font-mono text-[#D9251D] font-bold">
                  Incorrect passcode. Use default: 1234
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] font-mono uppercase tracking-widest text-xs transition-colors font-bold cursor-pointer"
              >
                Access Admin Panel
              </button>
            </form>
            <button
              onClick={() => setIsUnlocked(true)}
              className="mt-4 text-[11px] font-mono text-[#6B6862] hover:text-[#111111] underline"
            >
              Skip / Quick Open Admin
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center justify-between border-b border-[#111111] bg-[#F4F1EA] px-6 text-xs font-mono overflow-x-auto">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-3 uppercase tracking-wider font-bold transition-colors ${
                    activeTab === 'inventory' ? 'border-b-2 border-[#D9251D] text-[#D9251D] bg-white' : 'text-[#6B6862] hover:text-[#111111]'
                  }`}
                >
                  Current Catalog ({catalogItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-4 py-3 uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'add' ? 'border-b-2 border-[#D9251D] text-[#D9251D] bg-white' : 'text-[#6B6862] hover:text-[#111111]'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-[#D9251D]" />
                  <span>+ Add New Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-3 uppercase tracking-wider font-bold transition-colors ${
                    activeTab === 'orders' ? 'border-b-2 border-[#D9251D] text-[#D9251D] bg-white' : 'text-[#6B6862] hover:text-[#111111]'
                  }`}
                >
                  Live Orders ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('supabase')}
                  className={`px-4 py-3 uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'supabase' ? 'border-b-2 border-[#D9251D] text-[#D9251D] bg-white' : 'text-[#6B6862] hover:text-[#111111]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Do I Need Supabase?</span>
                </button>
              </div>

              <button
                onClick={onResetCatalog}
                className="text-[10px] font-mono text-[#6B6862] hover:text-[#D9251D] flex items-center gap-1 p-2"
                title="Restore default catalog items"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* TAB 1: INVENTORY LIST */}
            {activeTab === 'inventory' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#111111]/20">
                  <span className="text-xs font-mono text-[#6B6862] uppercase tracking-wider">
                    {catalogItems.length} Products Live on Website
                  </span>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-3 py-1.5 bg-[#111111] text-[#F4F1EA] hover:bg-[#D9251D] text-xs font-mono uppercase tracking-wider flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Print</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catalogItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white border border-[#111111] flex gap-4 items-start justify-between relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover border border-[#111111] bg-slate-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono bg-[#111111] text-white px-1.5 py-0.2 uppercase">
                            {item.category.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-[#6B6862]">{item.code || 'OBJ'}</span>
                        </div>
                        <h4 className="font-bebas text-xl text-[#111111] truncate mt-1">
                          {item.title}
                        </h4>
                        <div className="text-xs font-mono text-[#111111]">
                          <strong>₹{Number(item.price).toLocaleString('en-IN')}</strong> • <span className="text-[#6B6862]">{item.printTime}</span>
                        </div>
                        <p className="text-[10px] font-mono text-[#6B6862] truncate mt-1">
                          {item.material} • {item.dimensions}
                        </p>
                      </div>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-2 text-[#6B6862] hover:text-[#D9251D] hover:bg-black/5 transition-colors shrink-0"
                        title="Delete product from catalog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: ADD NEW DESIGN FORM */}
            {activeTab === 'add' && (
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#111111]/20">
                  <div>
                    <h4 className="font-bebas text-2xl text-[#111111] tracking-wide">
                      PUBLISH NEW DESIGN TO CATALOG
                    </h4>
                    <p className="text-xs font-mono text-[#6B6862]">
                      Fill details below to instantly show this product on the website.
                    </p>
                  </div>
                  {addedSuccess && (
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-100 border border-emerald-600 px-3 py-1 font-bold">
                      ✓ Published Live!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="e.g. Spiral Low-Poly Pen Stand"
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Category *
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    >
                      <option value="d2c">D2C // Sculptural & Art Decor</option>
                      <option value="b2b">B2B // Hardware & Prototyping</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Price in ₹ (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      min="99"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      placeholder="699"
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Bambu Print Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={newItem.printTime}
                      onChange={(e) => setNewItem({ ...newItem, printTime: e.target.value })}
                      placeholder="e.g. 2h 45m"
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Physical Dimensions
                    </label>
                    <input
                      type="text"
                      value={newItem.dimensions}
                      onChange={(e) => setNewItem({ ...newItem, dimensions: e.target.value })}
                      placeholder="e.g. 75 × 75 × 90 mm"
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Recommended Material
                    </label>
                    <select
                      value={newItem.material}
                      onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    >
                      <option value="Architectural Matte PLA">Architectural Matte PLA</option>
                      <option value="Prismatic Silk Dual-Tone">Prismatic Silk Dual-Tone (Chameleon)</option>
                      <option value="Structural High-Impact PETG">Structural High-Impact PETG (75°C)</option>
                      <option value="Vulcanized Elastomer TPU 95A">Vulcanized Elastomer TPU 95A (Flexible)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                      Image URL (Unsplash or direct image link)
                    </label>
                    <input
                      type="url"
                      value={newItem.image}
                      onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-1">
                    Design Description
                  </label>
                  <textarea
                    rows={2}
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Brief architectural or functional notes for customers..."
                    className="w-full bg-white border border-[#111111] p-2.5 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className="px-4 py-2.5 border border-[#111111] text-xs font-mono uppercase tracking-wider hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D9251D] text-white hover:bg-[#111111] text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish To Live Catalog</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: LIVE ORDERS */}
            {activeTab === 'orders' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#111111]/20">
                  <span className="text-xs font-mono text-[#6E6B65] uppercase tracking-wider">
                    Incoming Customer Commissions ({orders.length})
                  </span>
                  <span className="text-[10px] font-mono text-[#D9251D] font-bold">
                    Delivery via Bengaluru Post / Porter
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 text-xs font-mono text-[#6E6B65]">
                    No orders placed yet. Place a test order through the checkout drawer to see it appear here in real-time!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord, idx) => (
                      <div key={ord.id || idx} className="p-5 bg-white border border-[#111111]">
                        <div className="flex items-start justify-between border-b border-[#111111]/20 pb-3 mb-3">
                          <div>
                            <span className="text-[10px] font-mono bg-[#111111] text-white px-2 py-0.5 uppercase">
                              ID: {ord.id}
                            </span>
                            <h4 className="font-bebas text-xl text-[#111111] mt-1">
                              {ord.name} ({ord.phone || ord.email})
                            </h4>
                            <p className="text-xs font-mono text-[#6E6B65]">
                              {ord.address}, {ord.city} {ord.postalCode}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-bebas text-2xl text-[#111111] block">
                              ₹{Number(ord.totalAmount).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-mono text-[#D9251D] uppercase font-bold">
                              {ord.deliveryType === 'porter' ? 'Porter Same-Day' : ord.deliveryType === 'pickup' ? 'Studio Pickup' : 'Bengaluru Post'}
                            </span>
                          </div>
                        </div>

                        {/* Items list */}
                        <div className="space-y-1.5 text-xs font-mono text-[#111111]">
                          <span className="text-[10px] text-[#6B6862] uppercase block">Ordered Items:</span>
                          {ord.items?.map((it, i) => (
                            <div key={i} className="flex justify-between bg-[#FAF8F3] p-2 border border-[#111111]/10">
                              <span>{it.quantity}x {it.title} ({it.material})</span>
                              <span>₹{Number(it.totalPrice).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DO I NEED SUPABASE? */}
            {activeTab === 'supabase' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs font-mono">
                <div className="border border-[#111111] p-6 bg-white space-y-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#D9251D]" />
                    <h4 className="font-bebas text-2xl text-[#111111] tracking-wide">
                      DO YOU NEED SUPABASE FOR THIS?
                    </h4>
                  </div>

                  <div className="space-y-3 leading-relaxed text-[#111111]">
                    <div className="p-3 bg-[#F4F1EA] border border-[#111111]">
                      <strong className="text-[#D9251D] block mb-1">RIGHT NOW (Development & Local Testing): NO</strong>
                      The admin panel is already working right now using browser <code>localStorage</code>. Any design you add or delete here will immediately update on your website and persist across page reloads.
                    </div>

                    <div className="p-3 bg-[#111111] text-[#F4F1EA]">
                      <strong className="text-[#D9251D] block mb-1">WHEN YOU LAUNCH TO THE PUBLIC: YES (Recommended)</strong>
                      Why Supabase is ideal for your 3D printing business:
                      <ul className="list-disc list-inside mt-2 space-y-1.5 text-white/90">
                        <li><strong>Shared Cloud Catalog:</strong> When you add a new 3D model from your phone, all visitors around Bengaluru will see it immediately.</li>
                        <li><strong>Customer STL Storage:</strong> Customers upload large <code>.stl</code> or <code>.step</code> CAD files (10MB–100MB). Supabase Storage securely stores them in the cloud so you can download them directly into Bambu Studio on your PC.</li>
                        <li><strong>Order Database:</strong> Every order, customer phone, GSTIN, and delivery address gets stored safely in PostgreSQL.</li>
                        <li><strong>100% Free Tier:</strong> Supabase free tier includes 500MB database, 1GB file storage, and 50,000 monthly active users—plenty to start your 3D printing business with zero hosting costs.</li>
                      </ul>
                    </div>

                    <p className="text-[#6B6862]">
                      When you are ready to deploy online, connecting Supabase takes just 10 minutes with two environment variables (<code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>). Until then, your current local admin system gives you 100% full control right now!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
