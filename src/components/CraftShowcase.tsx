import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Coffee } from 'lucide-react';
import { SmilingCoffeeCup, IcedCoffeeCup, RetroStampBadge, SteamHeart } from './Stickers';
import { useCart } from '../context/CartContext';
import { COFFEE_MENU } from '../data/coffeeData';

export const CraftShowcase: React.FC = () => {
  const { addItem } = useCart();
  const bottledItem = COFFEE_MENU.find((i) => i.id === 'bottled-original') || COFFEE_MENU[3];
  const hotItem = COFFEE_MENU.find((i) => i.id === 'classic-flat-white') || COFFEE_MENU[6];

  return (
    <section id="story" className="relative py-20 bg-[#FFF8F0] overflow-hidden">
      {/* Playful Moving Marquee Ribbon */}
      <div className="w-full bg-[#8B5E3C] text-[#FFF8F0] py-3.5 overflow-hidden whitespace-nowrap border-y-2 border-[#5C3820] shadow-inner select-none -rotate-1 mb-20 scale-102">
        <div className="flex animate-[marquee_25s_linear_infinite] gap-8 items-center text-sm font-bold tracking-widest uppercase font-display">
          <span>☕ 100% ETHICALLY SOURCED ARABICA</span>
          <span>·</span>
          <span>✨ 18-HOUR COLD EXTRACTION</span>
          <span>·</span>
          <span>💛 ZERO HARSH BITTERNESS</span>
          <span>·</span>
          <span>🌱 PLANT-BASED OAT MILK BAR</span>
          <span>·</span>
          <span>🥐 FRESH MORNING BRIOCHE</span>
          <span>·</span>
          <span>☕ 100% ETHICALLY SOURCED ARABICA</span>
          <span>·</span>
          <span>✨ 18-HOUR COLD EXTRACTION</span>
          <span>·</span>
          <span>💛 ZERO HARSH BITTERNESS</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Story 1: Image Left, Text Right (Pouring Latte Art & Ristretto Craft) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[2.5rem] bg-white p-4 shadow-xl border-2 border-[#E8D2BA] overflow-hidden group">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF1E6]">
                <img
                  src="/src/assets/images/latte_art_pour_1790978114144.jpg"
                  alt="Barista pouring silky microfoam latte art into ceramic cup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                    Ceramic Flat White Pour
                  </span>
                  <span className="font-mono">195°F Microfoam</span>
                </div>
              </div>
            </div>

            {/* Sticker accents */}
            <div className="absolute -top-5 -left-5">
              <SteamHeart className="w-14 h-14 rotate-[-12deg]" />
            </div>
            <div className="absolute -bottom-6 -right-6">
              <RetroStampBadge text="DIALED IN DAILY" className="rotate-6" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#8B5E3C]">
              <span>Chapter 01</span>
              <span>·</span>
              <span>The Espresso Dial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3B2417] leading-tight">
              We Measure Every Shot by the Milligram, Not the Clock.
            </h2>

            <p className="text-base text-[#6E4F39] leading-relaxed">
              Every morning before our café unlocks its doors, our head baristas pull test shots to calibrate for today’s ambient humidity and bar temperature.
            </p>

            <p className="text-sm text-[#6E4F39] leading-relaxed">
              We extract at a tight 1:2.1 ratio to lock in the sweetest compounds of the cherry—roasted hazelnut, brown sugar, and Meyer lemon zest—without touching over-extracted bitterness.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => addItem(hotItem)}
                className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#3B2417] text-white text-sm font-display font-semibold rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Order Handcrafted Flat White</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Story 2: Text Left, Image Right (Bottled Cold Brew Extraction) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#8B5E3C]">
              <span>Chapter 02</span>
              <span>·</span>
              <span>Cold Extraction Science</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#3B2417] leading-tight">
              18 Hours in Amber Glass. Grab and Go Perfection.
            </h2>

            <p className="text-base text-[#6E4F39] leading-relaxed">
              Our stubby glass bottles aren't just retro eye candy—they protect fragile coffee aromas from light degradation. Sealed with vacuum caps while chilled to 38°F, they stay crisp and intensely refreshing for up to 14 days in your fridge.
            </p>

            <div className="p-4 bg-[#FAF1E6] rounded-2xl border border-[#E8D2BA] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#3B2417]">
                <span>Purity Check</span>
                <span className="text-[#8B5E3C]">Zero Artificial Preservatives</span>
              </div>
              <div className="text-xs text-[#6E4F39]">
                Only 2 ingredients: Single-origin washed Arabica and mountain spring water.
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => addItem(bottledItem)}
                className="px-6 py-3 bg-[#3B2417] hover:bg-[#8B5E3C] text-white text-sm font-display font-semibold rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Add Bottled 18h Cold Brew ($5.25)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="relative rounded-[2.5rem] bg-white p-4 shadow-xl border-2 border-[#E8D2BA] overflow-hidden group">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF1E6]">
                <img
                  src="/src/assets/images/brew_crew_opening_bottle_1790980093310.jpg"
                  alt="Brew Crew glass bottle filled with whole roasted coffee beans with cream label and brown ribbon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                    Signature Bean Bottle
                  </span>
                  <span className="font-mono">100% Single Origin</span>
                </div>
              </div>
            </div>

            {/* Sticker accents */}
            <div className="absolute -top-6 -right-6">
              <IcedCoffeeCup className="w-16 h-16 rotate-12" />
            </div>
            <div className="absolute -bottom-4 -left-4">
              <RetroStampBadge text="FRESH HARVEST" className="-rotate-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
