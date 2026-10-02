import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Sparkles, Flame, Snowflake, Coffee } from 'lucide-react';
import { COFFEE_MENU, CoffeeItem } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import {
  CuteBeanSticker,
  SmilingCoffeeCup,
  IcedCoffeeCup,
  RetroStampBadge,
  SparkleSticker,
} from './Stickers';

type CategoryType = 'all' | 'iced' | 'bottled' | 'classic' | 'hot';

export const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('all');
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Drinks', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'iced', label: 'Iced Coffees', icon: <Snowflake className="w-4 h-4" /> },
    { id: 'bottled', label: 'Bottled Cold Brew', icon: <Coffee className="w-4 h-4" /> },
    { id: 'classic', label: 'Classic Coffees', icon: <Coffee className="w-4 h-4" /> },
    { id: 'hot', label: 'Hot Specials', icon: <Flame className="w-4 h-4" /> },
  ];

  const filteredItems = activeTab === 'all'
    ? COFFEE_MENU
    : COFFEE_MENU.filter((item) => item.category === activeTab);

  const handleQuickAdd = (item: CoffeeItem) => {
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="relative py-24 bg-[#FFF8F0] overflow-hidden">
      {/* Decorative grain and stickers */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* Decorative side stickers */}
      <div className="absolute top-12 right-8 pointer-events-none hidden lg:block opacity-80">
        <SmilingCoffeeCup className="w-16 h-16 rotate-12" />
      </div>
      <div className="absolute bottom-16 left-6 pointer-events-none hidden lg:block opacity-80">
        <CuteBeanSticker className="w-14 h-14 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8D2BA] shadow-xs text-xs font-semibold text-[#8B5E3C] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Handcrafted Daily with Passion</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#3B2417] tracking-tight">
            The Crew Menu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E4F39] font-hand text-xl">
            "Every sip is dialed in by baristas who genuinely care about your day."
          </p>
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#F1E3D3]/60 rounded-2xl border border-[#E8D2BA]/80 backdrop-blur-sm shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-white text-[#3B2417] shadow-sm scale-102 font-bold'
                    : 'text-[#6E4F39] hover:text-[#3B2417] hover:bg-white/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAdd={() => handleQuickAdd(item)}
                isAdded={addedId === item.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// Sub-component for individual card with interactive 3D tilt on hover for bottled brews & smooth lift for all
const MenuCard: React.FC<{
  item: CoffeeItem;
  onAdd: () => void;
  isAdded: boolean;
}> = ({ item, onAdd, isAdded }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isBottled = item.category === 'bottled';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isBottled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / -10);
    setRotateY((x - centerX) / 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isBottled && isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
            : isHovered
            ? 'translateY(-4px)'
            : 'none',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className={`group relative h-full bg-white rounded-3xl p-5 border border-[#E8D2BA] shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden ${
          isBottled ? 'ring-1 ring-[#C9A27E]/30 bg-gradient-to-b from-[#FFFDF9] to-[#FAF1E6]' : ''
        }`}
      >
        {/* Top Product Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF1E6] mb-4">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gentle scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Badge (Bestseller, New, Crew Favorite) */}
          {item.badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`sticker-badge px-3 py-1 text-[11px] font-bold rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1 ${
                  item.badge === 'Bestseller'
                    ? 'bg-[#8B5E3C] text-white'
                    : item.badge === 'Crew Favorite'
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-[#F4D06F] text-[#3B2417]'
                }`}
              >
                <span>★</span>
                <span>{item.badge}</span>
              </span>
            </div>
          )}

          {/* Volume pill */}
          {item.volume && (
            <div className="absolute bottom-2.5 left-3">
              <span className="text-[11px] font-semibold text-[#FFF8F0] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                {item.volume}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold font-display text-[#3B2417] leading-snug group-hover:text-[#8B5E3C] transition-colors">
                {item.name}
              </h3>
              <span className="text-lg font-bold font-mono text-[#3B2417]">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#6E4F39] leading-relaxed line-clamp-2">
              {item.description}
            </p>

            {/* Tasting Notes as clean unboxed typography with typographic separators */}
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

          {/* Bottom Action Bar */}
          <div className="mt-5 pt-3 border-t border-[#F1E3D3] flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#8B5E3C]">
              {item.category === 'bottled' ? 'Chilled Glass Bottle' : 'Made to order'}
            </span>

            <button
              onClick={onAdd}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                isAdded
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'bg-[#F1E3D3] hover:bg-[#8B5E3C] text-[#3B2417] hover:text-white shadow-xs'
              }`}
              aria-label={`Add ${item.name} to order`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Special 3D Glare sheen for bottled cold brews */}
        {isBottled && (
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 3}% ${
                50 + rotateX * -3
              }%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};
