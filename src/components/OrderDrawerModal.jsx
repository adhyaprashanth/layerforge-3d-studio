import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Copy, Check, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderDrawerModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart, onOrderPlaced }) {
  const [step, setStep] = useState('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    gstin: '',
    isB2B: false,
    deliveryType: 'porter', // 'porter' | 'bengaluru_post' | 'pickup'
    address: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    notes: '',
    paymentMethod: 'upi'
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.totalPrice), 0);
  const deliveryFee = formData.deliveryType === 'pickup' ? 0 : subtotal >= 1499 ? 0 : formData.deliveryType === 'porter' ? 99 : 60;
  const gstTax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + deliveryFee + gstTax;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderId = 'BLR-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedOrderId(orderId);

    // Record order for admin
    if (onOrderPlaced) {
      onOrderPlaced({
        id: orderId,
        createdAt: new Date().toISOString(),
        items: cartItems,
        totalAmount: grandTotal,
        ...formData
      });
    }

    setStep('success');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(confirmedOrderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl h-full bg-[#FAF9F5] border-l hairline-border flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-6 md:p-8 hairline-b flex items-center justify-between sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
              Bangalore Commission Registry
            </span>
            <h3 className="font-syne font-bold text-xl text-[#121212] tracking-tight">
              Queued Specimens ({cartItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#121212] hover:text-[#E63920] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1">
          {step === 'cart' && (
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-3xl font-mono text-[#121212]/30 block mb-3">[0]</span>
                  <h4 className="font-syne font-bold text-lg text-[#121212]">Commission Registry Empty</h4>
                  <p className="text-xs font-mono text-[#6E6B65] mt-2 max-w-xs mx-auto">
                    Calibrate a custom specimen in the Commission Terminal or acquire an archival design from Series 01.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-3 bg-[#121212] text-[#F6F5F1] font-mono text-xs uppercase tracking-widest hover:bg-[#E63920] transition-colors"
                  >
                    Open Terminal
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-5 bg-white hairline-border flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.colorHex || '#121212' }} />
                            <h4 className="font-syne font-bold text-base text-[#121212]">{item.title}</h4>
                          </div>
                          <p className="text-xs font-mono text-[#6E6B65] mt-1">
                            {item.material} • {item.color}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#6E6B65] hover:text-[#E63920] p-1 transition-colors"
                          title="Remove specimen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#6E6B65]">
                        <span className="px-2 py-0.5 bg-[#FAF9F5] hairline-border">
                          Qty: {item.quantity}
                        </span>
                        <span className="px-2 py-0.5 bg-[#FAF9F5] hairline-border">
                          Infill: {item.infill}
                        </span>
                        <span className="px-2 py-0.5 bg-[#FAF9F5] hairline-border">
                          Pitch: {item.layerHeight}
                        </span>
                        {item.isMultiColor && (
                          <span className="px-2 py-0.5 bg-[#F6F5F1] text-[#E63920] hairline-border font-semibold">
                            AMS Multi-Channel
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 hairline-t text-xs font-mono">
                        <span className="text-[#6E6B65]">Bambu Time: ~{item.estimatedTime}</span>
                        <span className="font-syne font-bold text-base text-[#121212]">
                          ₹{Number(item.totalPrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="p-3.5 bg-[#FAF9F5] hairline-border text-xs font-mono text-[#121212]">
                    <span className="text-[#E63920] font-semibold">Bangalore Dispatch Active:</span> Geometries ordered within 3 hours dispatch via Porter (Bangalore same-day) or BlueDart Air (Pan-India).
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'details' && (
            <form id="order-form" onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-b">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920]">
                  Consignment & Tax Billing
                </span>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs font-mono text-[#6E6B65] hover:text-[#121212] underline"
                >
                  ← Edit Specimens
                </button>
              </div>

              {/* Delivery Mode Choice: Strictly Bengaluru Post / Porter */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1.5">
                  Delivery Method (Only Bengaluru Post / Porter)
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'porter' })}
                    className={`p-2.5 hairline-border text-center transition-colors ${
                      formData.deliveryType === 'porter' ? 'bg-[#121212] text-white font-semibold' : 'bg-white text-[#121212]'
                    }`}
                  >
                    <span>Porter</span>
                    <span className="block text-[10px] opacity-70">Same-Day BLR (₹99)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'bengaluru_post' })}
                    className={`p-2.5 hairline-border text-center transition-colors ${
                      formData.deliveryType === 'bengaluru_post' ? 'bg-[#121212] text-white font-semibold' : 'bg-white text-[#121212]'
                    }`}
                  >
                    <span>Bengaluru Post</span>
                    <span className="block text-[10px] opacity-70">Speed Post (₹60)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                    className={`p-2.5 hairline-border text-center transition-colors ${
                      formData.deliveryType === 'pickup' ? 'bg-[#121212] text-white font-semibold' : 'bg-white text-[#121212]'
                    }`}
                  >
                    <span>Studio Pickup</span>
                    <span className="block text-[10px] opacity-70">Free (Indiranagar)</span>
                  </button>
                </div>
              </div>

              {/* B2B Toggle */}
              <div className="flex items-center justify-between p-4 bg-white hairline-border">
                <div>
                  <span className="text-xs font-mono uppercase font-semibold text-[#121212] block">Corporate / B2B Commission</span>
                  <span className="text-[11px] font-mono text-[#6E6B65]">Requires GSTIN for 18% Input Tax Credit & formal invoice</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isB2B}
                  onChange={(e) => setFormData({ ...formData, isB2B: e.target.checked })}
                  className="w-4 h-4 accent-[#121212] cursor-pointer"
                />
              </div>

              {formData.isB2B && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Company Legal Entity *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Hardware Pvt Ltd"
                      className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">GSTIN Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      placeholder="29AAAAA0000A1Z5"
                      className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditya Rao"
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Email Address (for invoices & CAD updates) *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aditya@startup.com"
                  className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                />
              </div>

              {formData.deliveryType !== 'pickup' && (
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Bangalore / Delivery Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="12th Main, HAL 2nd Stage, Indiranagar"
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="560038"
                    className="w-full bg-white hairline-border p-2.5 text-xs font-mono text-[#121212] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6E6B65] mb-1.5">
                  Preferred Payment Protocol
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-2.5 hairline-border text-left flex items-center justify-between ${
                      formData.paymentMethod === 'upi' ? 'bg-[#121212] text-white' : 'bg-white text-[#121212]'
                    }`}
                  >
                    <span>UPI (GPay / PhonePe / Paytm)</span>
                    <span className="text-[10px] font-bold text-[#E63920]">Instant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-2.5 hairline-border text-left flex items-center justify-between ${
                      formData.paymentMethod === 'card' ? 'bg-[#121212] text-white' : 'bg-white text-[#121212]'
                    }`}
                  >
                    <span>Card / NetBanking / NEFT</span>
                    <span className="text-[10px] opacity-70">Corporate</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-12 space-y-4">
              <span className="w-12 h-12 rounded-full bg-[#121212] text-[#F6F5F1] flex items-center justify-center mx-auto text-lg font-mono">
                ✓
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
                Queued into Bambu Motion System // Bangalore Hub
              </span>
              <h4 className="font-syne font-extrabold text-3xl text-[#121212]">Commission Confirmed</h4>
              <p className="text-xs font-mono text-[#6E6B65] max-w-sm mx-auto leading-relaxed">
                Your geometry has entered the automated Bambu Lab A1 slicing queue in Bangalore. Order confirmation, GST invoice, and live webcam milestones will transmit to <strong>{formData.email || 'your email'}</strong> and WhatsApp at <strong>{formData.phone || 'your phone'}</strong>.
              </p>

              <div className="mt-6 p-4 bg-white hairline-border max-w-xs mx-auto flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[9px] text-[#6E6B65] uppercase block">Consignment Tracking Code</span>
                  <span className="font-bold text-[#121212]">{confirmedOrderId}</span>
                </div>
                <button
                  onClick={copyOrderId}
                  className="p-1.5 hover:bg-black/5 transition-colors"
                  title="Copy code"
                >
                  {copiedId ? <Check className="w-4 h-4 text-[#E63920]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#121212] text-[#F6F5F1] font-mono uppercase tracking-widest text-xs hover:bg-[#E63920] transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && cartItems.length > 0 && (
          <div className="p-6 md:p-8 hairline-t bg-[#FAF9F5]">
            <div className="space-y-2 text-xs font-mono text-[#121212] mb-4">
              <div className="flex justify-between">
                <span className="text-[#6E6B65]">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6B65]">Delivery ({formData.deliveryType === 'porter' ? 'Porter Same-Day' : formData.deliveryType === 'bengaluru_post' ? 'Bengaluru Post' : 'Studio Pickup'})</span>
                <span>{deliveryFee === 0 ? <strong className="text-[#E63920]">Free</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6B65]">18% GST (HSN 8477 // ITC claimable)</span>
                <span>₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 hairline-t">
                <span>Total Payable</span>
                <span className="font-syne font-black text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('details')}
                className="w-full py-4 bg-[#121212] text-[#F6F5F1] hover:bg-[#E63920] font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Bangalore Delivery & GST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="order-form"
                className="w-full py-4 bg-[#E63920] text-[#F6F5F1] hover:bg-[#121212] font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize & Send to Bambu Queue (₹{grandTotal.toLocaleString('en-IN')})</span>
              </button>
            )}

            <div className="mt-3 text-center text-[10px] font-mono text-[#6E6B65] uppercase">
              UPI / NetBanking / Cards • 100% Free Dimensional Reprint Guarantee
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
