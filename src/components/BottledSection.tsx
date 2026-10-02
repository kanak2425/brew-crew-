import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Sparkles, Shield, Snowflake } from 'lucide-react';
import { COFFEE_MENU, CoffeeItem } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import { RetroStampBadge, SparkleSticker } from './Stickers';

export const BottledSection: React.FC = () => {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const bottledItems = COFFEE_MENU.filter((item) => item.category === 'bottled');

  const handleAdd = (item: CoffeeItem) => {
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="bottled" className="relative py-24 bg-[#FAF1E6] overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8D2BA] shadow-xs text-xs font-semibold text-[#8B5E3C] mb-3">
            <Snowflake className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Ready-To-Drink · Grab & Go</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#3B2417] tracking-tight">
            Bottled 18h Cold Brew
          </h2>
          <p className="mt-2 text-base text-[#6E4F39] font-hand text-xl">
            "Keep your home fridge stocked with café quality."
          </p>
        </div>

        {/* 3 Tall Bottled Cards with 3D Tilt on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bottledItems.map((item) => (
            <BottledCard
              key={item.id}
              item={item}
              onAdd={() => handleAdd(item)}
              isAdded={addedId === item.id}
            />
          ))}
        </div>

        {/* Bottom Cold Chain Guarantee */}
        <div className="mt-14 max-w-xl mx-auto p-4 rounded-2xl bg-white border border-[#E8D2BA] shadow-xs flex items-center justify-center gap-3 text-xs text-[#6E4F39]">
          <Shield className="w-5 h-5 text-[#8B5E3C] flex-shrink-0" />
          <span>
            <strong>Cold Chain Guaranteed:</strong> Every bottle is chilled immediately after bottling and kept below 38°F until it reaches your hands.
          </span>
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Sub-component
const BottledCard: React.FC<{
  item: CoffeeItem;
  onAdd: () => void;
  isAdded: boolean;
}> = ({ item, onAdd, isAdded }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / -8);
    setRotateY((x - centerX) / 8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
            : 'none',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
        }}
        className="relative h-full bg-white rounded-[2rem] p-6 border-2 border-[#E8D2BA] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
      >
        {/* Top Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-[#8B5E3C] uppercase tracking-wider font-mono">
            {item.volume || '330ml Glass'}
          </span>
          {item.badge && (
            <span
              className={`px-3 py-1 text-[11px] font-bold rounded-full border border-white shadow-xs uppercase tracking-wider ${
                item.badge === 'Bestseller'
                  ? 'bg-[#8B5E3C] text-white'
                  : item.badge === 'Crew Favorite'
                  ? 'bg-[#E07A5F] text-white'
                  : 'bg-[#F4D06F] text-[#3B2417]'
              }`}
            >
              ★ {item.badge}
            </span>
          )}
        </div>

        {/* Tall Product Photo */}
        <div className="relative aspect-[3/4] max-h-72 rounded-2xl overflow-hidden bg-[#FAF1E6] mb-5">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gentle glare highlight that moves with cursor */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 4}% ${
                50 + rotateX * -4
              }%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
            }}
          />

          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
            18h Cold Extracted
          </div>
        </div>

        {/* Info & Notes */}
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold font-display text-[#3B2417] group-hover:text-[#8B5E3C] transition-colors">
                {item.name}
              </h3>
              <span className="text-lg font-bold font-mono text-[#3B2417]">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-xs text-[#6E4F39] leading-relaxed">
              {item.description}
            </p>

            {/* Tasting notes */}
            <div className="mt-3 flex items-center flex-wrap gap-1.5 text-[11px] text-[#8B5E3C]">
              <span className="font-semibold text-[#3B2417]">Notes:</span>
              {item.notes.map((note, index) => (
                <React.Fragment key={note}>
                  <span>{note}</span>
                  {index < item.notes.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-[#F1E3D3]">
            <button
              onClick={onAdd}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 ${
                isAdded
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-[#8B5E3C] hover:bg-[#3B2417] text-white shadow-sm'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bottled Cold Brew</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
