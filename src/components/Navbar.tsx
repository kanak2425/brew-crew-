import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF8F0]/90 backdrop-blur-md shadow-sm border-b border-[#E8D2BA]/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Zone (Single text element wordmark in display face) */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-bold font-display text-[#3B2417] tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            BREW CREW
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C3820]">
            <a
              href="#hero-walkthrough"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              The Café
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#menu"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#bottled"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              Bottled Cold Brew
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#why-crew"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              Why Brew Crew
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#story"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              The Roastery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#cafe"
              className="hover:text-[#3B2417] transition-colors relative group py-1"
            >
              Our Café
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A27E] transition-all duration-200 group-hover:w-full" />
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Replay Intro Trigger */}
            <button
              onClick={onReplayIntro}
              title="Replay Uncapping Intro Animation"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8B5E3C] hover:text-[#3B2417] bg-white/70 hover:bg-white rounded-full border border-[#E8D2BA] transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Intro</span>
            </button>

            {/* Visit Café Direct Anchor */}
            <a
              href="#cafe"
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold text-[#8B5E3C] hover:text-[#3B2417] bg-[#F1E3D3]/70 hover:bg-[#F1E3D3] rounded-full transition-colors whitespace-nowrap"
            >
              Visit Café
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-2 bg-[#8B5E3C] hover:bg-[#3B2417] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              aria-label={`Open shopping bag, ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:rotate-6" />
              <span className="text-xs font-bold font-mono">
                {totalItems > 0 ? `$${subtotal.toFixed(2)}` : 'Bag'}
              </span>

              {totalItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F4D06F] text-[#3B2417] text-[11px] font-bold font-mono shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
