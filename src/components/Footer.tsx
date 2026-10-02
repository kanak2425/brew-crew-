import React, { useState } from 'react';
import { Heart, Instagram, Sparkles, Send, Check } from 'lucide-react';
import {
  SmilingCoffeeCup,
  CuteBeanSticker,
  IcedCoffeeCup,
  RetroStampBadge,
} from './Stickers';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.9 },
      colors: ['#F4D06F', '#8B5E3C', '#E07A5F'],
    });
  };

  return (
    <footer className="relative bg-[#FFF8F0] border-t-2 border-[#E8D2BA] pt-16 pb-12 overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* Scattered background stickers */}
      <div className="absolute -bottom-6 left-12 opacity-30 pointer-events-none">
        <SmilingCoffeeCup className="w-24 h-24 rotate-12" />
      </div>
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none">
        <CuteBeanSticker className="w-20 h-20 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8D2BA]">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-display text-[#3B2417] tracking-tight">
                BREW CREW
              </span>
              <RetroStampBadge text="EST. 2021" />
            </div>

            <p className="text-sm text-[#6E4F39] leading-relaxed max-w-sm">
              Artisanal small-batch cold brews, handcrafted espresso, and sunny community vibes. Made with ethically traded Arabica beans and zero shortcuts.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#8B5E3C]">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-current" />
              <span>and oat milk in Los Angeles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#3B2417]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#6E4F39]">
              <li>
                <a href="#menu" className="hover:text-[#3B2417] transition-colors">
                  Iced Coffees & Frappes
                </a>
              </li>
              <li>
                <a href="#bottled" className="hover:text-[#3B2417] transition-colors">
                  Bottled 18h Cold Brews
                </a>
              </li>
              <li>
                <a href="#why-crew" className="hover:text-[#3B2417] transition-colors">
                  Roasting Standards
                </a>
              </li>
              <li>
                <a href="#cafe" className="hover:text-[#3B2417] transition-colors">
                  Visit The Sunbeam Alley Café
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#3B2417] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Join the Crew</span>
            </h4>
            <p className="text-xs text-[#6E4F39]">
              Get secret menu drops, free sticker drop alerts, and 15% off your first cold brew order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#E8F5E9] rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Welcome to the Crew!</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Use promo code <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300">SIPHAPPY15</strong> at checkout for 15% off!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-white border border-[#C9A27E]/60 rounded-xl text-xs text-[#3B2417] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#8B5E3C] hover:bg-[#3B2417] text-white text-xs font-bold font-display rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B5E3C] gap-4">
          <p>© {new Date().getFullYear()} BREW CREW COFFEE CO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <a href="#cafe" className="hover:text-[#3B2417] transition-colors">
              Privacy & Cookies
            </a>
            <span>·</span>
            <a href="#cafe" className="hover:text-[#3B2417] transition-colors">
              Barista Careers
            </a>
            <span>·</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#3B2417] transition-colors flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@brewcrewcoffee</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
