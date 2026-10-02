import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CuteBeanSticker, SmilingCoffeeCup, RetroStampBadge } from './Stickers';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen, totalItems, subtotal, freeStickerProgress } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    phone: '(555) 928-1123',
    pickupTime: 'ASAP (~15 mins)',
    notes: 'Extra cold foam please! 😊',
  });

  const tax = subtotal * 0.0825;
  const grandTotal = subtotal > 0 ? subtotal + tax : 0;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5E3C', '#F4D06F', '#E07A5F', '#C9A27E', '#FFF8F0'],
    });
  };

  const resetAndClose = () => {
    setIsCheckingOut(false);
    setOrderConfirmed(false);
    setIsCartOpen(false);
    if (orderConfirmed) {
      clearCart();
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isCheckingOut && setIsCartOpen(false)}
            className="fixed inset-0 bg-[#3B2417]/50 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFF8F0] shadow-2xl z-50 flex flex-col border-l-2 border-[#E8D2BA]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8D2BA] bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F1E3D3] flex items-center justify-center text-[#8B5E3C] shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-[#3B2417] leading-none">
                    Your Crew Order
                  </h3>
                  <span className="text-xs text-[#8B5E3C] font-medium">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in bag
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F1E3D3]/60 hover:bg-[#F1E3D3] text-[#3B2417] flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Stickers Progress Banner */}
            <div className="px-5 py-3 bg-[#F8EFE4] border-b border-[#E8D2BA] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8B5E3C]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {subtotal >= 20 ? (
                    <span className="text-[#3B2417] font-bold">🎉 Free Holographic Sticker Pack Unlocked!</span>
                  ) : (
                    <span>Add ${(20 - subtotal).toFixed(2)} more for Free Sticker Pack!</span>
                  )}
                </span>
                <span className="font-mono">{freeStickerProgress}%</span>
              </div>
              <div className="w-full h-2 bg-[#E8D2BA]/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A27E] to-[#8B5E3C] rounded-full transition-all duration-300"
                  style={{ width: `${freeStickerProgress}%` }}
                />
              </div>
            </div>

            {/* Order Confirmation View */}
            {orderConfirmed ? (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <CuteBeanSticker className="w-9 h-9" />
                  </div>
                </div>

                <RetroStampBadge text="ORDER #BC-8492 CONFIRMED" className="mb-3" />
                <h4 className="text-2xl font-bold font-display text-[#3B2417]">
                  Brewing Right Now!
                </h4>
                <p className="text-sm text-[#8B5E3C] mt-2 max-w-xs">
                  Thanks <strong className="text-[#3B2417]">{formData.name}</strong>! Your order will be chilled, sealed, and ready for pickup at our Sunbeam Alley café in <strong className="text-[#3B2417]">~15 minutes</strong>.
                </p>

                <div className="w-full mt-6 p-4 bg-white rounded-2xl border border-[#E8D2BA] text-left text-xs space-y-2">
                  <div className="flex justify-between text-[#8B5E3C]">
                    <span>Customer:</span>
                    <span className="font-medium text-[#3B2417]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-[#8B5E3C]">
                    <span>Contact:</span>
                    <span className="font-medium text-[#3B2417]">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between text-[#8B5E3C]">
                    <span>Total Charged:</span>
                    <span className="font-bold text-[#3B2417]">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#8B5E3C]">
                    <span>Bonus:</span>
                    <span className="font-semibold text-[#8B5E3C]">Includes Free Crew Sticker</span>
                  </div>
                </div>

                <button
                  onClick={resetAndClose}
                  className="mt-6 w-full py-3.5 bg-[#8B5E3C] hover:bg-[#3B2417] text-white font-display text-base font-semibold rounded-2xl shadow-lg transition-transform active:scale-98"
                >
                  Awesome, Sip Happy!
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form View */
              <div className="flex-1 p-6 overflow-y-auto">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs font-semibold text-[#8B5E3C] hover:text-[#3B2417] flex items-center gap-1 mb-4"
                >
                  ← Back to Bag
                </button>

                <h4 className="text-xl font-bold font-display text-[#3B2417] mb-1">
                  Express Pickup Order
                </h4>
                <p className="text-xs text-[#8B5E3C] mb-5">
                  Pick up fresh at 442 Sunbeam Alley, Arts District
                </p>

                <form onSubmit={handleCompleteOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C9A27E]/60 rounded-xl text-sm text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                      placeholder="e.g. Maya Chen"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] uppercase tracking-wider mb-1">
                      Phone Number (for pickup SMS)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C9A27E]/60 rounded-xl text-sm text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] uppercase tracking-wider mb-1">
                      Ready Time
                    </label>
                    <select
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C9A27E]/60 rounded-xl text-sm text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                    >
                      <option>ASAP (~15 mins)</option>
                      <option>In 30 minutes</option>
                      <option>In 45 minutes</option>
                      <option>In 1 hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] uppercase tracking-wider mb-1">
                      Barista Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#C9A27E]/60 rounded-xl text-sm text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                      placeholder="Extra ice, less sweet, or cold foam on the side..."
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E8D2BA] space-y-1.5 text-xs text-[#8B5E3C]">
                    <div className="flex justify-between">
                      <span>Items Total:</span>
                      <span className="font-mono text-[#3B2417]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (8.25%):</span>
                      <span className="font-mono text-[#3B2417]">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#3B2417] pt-2 border-t border-[#E8D2BA]">
                      <span>Grand Total:</span>
                      <span className="font-mono">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-[#8B5E3C] hover:bg-[#3B2417] text-white font-display text-base font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                  >
                    <span>Place Order & Pay at Bar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Itemized Cart Items View */
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8B5E3C]">
                    <SmilingCoffeeCup className="w-20 h-20 mb-3" />
                    <h4 className="text-lg font-bold font-display text-[#3B2417]">
                      Your cup is looking empty!
                    </h4>
                    <p className="text-xs text-[#8B5E3C] mt-1 max-w-[220px]">
                      Add some handcrafted cold brew or warm velvety lattes from the menu.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 px-5 py-2.5 bg-[#8B5E3C] text-white text-xs font-semibold rounded-full shadow hover:bg-[#3B2417] transition-colors"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.coffee.id}
                      className="bg-white rounded-2xl p-3.5 border border-[#E8D2BA] shadow-sm flex items-center gap-3 relative group"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F1E3D3] flex-shrink-0 relative">
                        <img
                          src={item.coffee.image}
                          alt={item.coffee.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#3B2417] truncate font-display">
                            {item.coffee.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.coffee.id)}
                            className="text-[#8B5E3C]/60 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#8B5E3C] flex items-center gap-1.5 mt-0.5">
                          <span>{item.temperature || 'Iced'}</span>
                          <span>·</span>
                          <span>{item.milkChoice || 'Oat Milk'}</span>
                          {item.coffee.volume && (
                            <>
                              <span>·</span>
                              <span>{item.coffee.volume}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#3B2417] font-mono">
                            ${(item.coffee.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center gap-2 bg-[#F8EFE4] px-2 py-0.5 rounded-full border border-[#E8D2BA]">
                            <button
                              onClick={() => updateQuantity(item.coffee.id, -1)}
                              className="text-[#8B5E3C] hover:text-[#3B2417] p-0.5 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold font-mono text-[#3B2417] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.coffee.id, 1)}
                              className="text-[#8B5E3C] hover:text-[#3B2417] p-0.5 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Footer Summary & Checkout CTA */}
            {items.length > 0 && !isCheckingOut && !orderConfirmed && (
              <div className="p-5 bg-white border-t border-[#E8D2BA] space-y-3">
                <div className="space-y-1.5 text-xs text-[#8B5E3C]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-[#3B2417] font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8.25%):</span>
                    <span className="font-mono text-[#3B2417]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#3B2417] pt-2 border-t border-[#E8D2BA]">
                    <span>Total:</span>
                    <span className="font-mono font-bold">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 bg-[#8B5E3C] hover:bg-[#3B2417] text-white font-display text-base font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#8B5E3C] flex items-center justify-center gap-1">
                  <span>☕ Ready in ~15 mins at our café</span>
                  <span>·</span>
                  <span>Stickers included</span>
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
