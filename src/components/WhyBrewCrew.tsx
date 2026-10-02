import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, Clock, Heart, Award, ShieldCheck, Check } from 'lucide-react';
import { CuteBeanSticker, CuteCroissant, SteamHeart, RetroStampBadge } from './Stickers';

export const WhyBrewCrew: React.FC = () => {
  const cards = [
    {
      icon: <Flame className="w-6 h-6 text-[#E07A5F]" />,
      sticker: <CuteBeanSticker className="w-12 h-12" />,
      title: 'Freshly Roasted Beans',
      subtitle: 'Single-Origin & Micro-Batches',
      desc: 'We partner directly with sustainable, high-altitude family estates in Colombia and Ethiopia. Micro-roasted in small 12-kilo batches every single Tuesday so your cup always bursts with peak aromatics.',
      metric: 'Under 7 Days',
      metricLabel: 'From Roaster to Tap',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#8B5E3C]" />,
      sticker: <SteamHeart className="w-10 h-10" />,
      title: '18-Hour Slow Steep',
      subtitle: 'Cold-Extracted Perfection',
      desc: 'No shortcut concentrates. Our cold brew steeps for a patient 18 hours in cold, triple-filtered mountain water. This extracts 67% less acid than traditional hot brewing for unmatched natural sweetness.',
      metric: '67% Less Acid',
      metricLabel: 'Smooth On The Stomach',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#E07A5F]" />,
      sticker: <CuteCroissant className="w-12 h-12" />,
      title: 'Made With Love',
      subtitle: 'Friendly Barista Community',
      desc: 'No snobbery, just warm smiles. Whether you want a triple ristretto or a decaf iced oat vanilla cloud, our crew treats every cup like a gift crafted specifically for your morning.',
      metric: '100% Guaranteed',
      metricLabel: 'Remade With A Smile',
    },
  ];

  return (
    <section id="why-crew" className="relative py-24 bg-[#FAF1E6] overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

      {/* Subtle organic accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8D2BA] shadow-xs text-xs font-semibold text-[#8B5E3C] mb-3">
            <Award className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>The Brew Crew Standard</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#3B2417] tracking-tight">
            Why You'll Fall in Love
          </h2>
          <p className="mt-3 text-base text-[#6E4F39] max-w-xl mx-auto">
            From farm transparency to our proprietary slow-drip vessels, here's what makes every bottle and pour unforgettable.
          </p>
        </div>

        {/* 3 Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-3xl p-7 border border-[#E8D2BA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Corner Sticker */}
              <div className="absolute -top-3 -right-3 pointer-events-none transition-transform group-hover:rotate-12 group-hover:scale-110">
                {card.sticker}
              </div>

              <div>
                {/* Icon box */}
                <div className="w-14 h-14 rounded-2xl bg-[#F1E3D3] flex items-center justify-center mb-5 shadow-xs">
                  {card.icon}
                </div>

                <div className="text-xs uppercase tracking-wider font-bold text-[#8B5E3C] mb-1">
                  {card.subtitle}
                </div>
                <h3 className="text-2xl font-bold font-display text-[#3B2417] leading-snug">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm text-[#6E4F39] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Quantified proof metric */}
              <div className="mt-8 pt-4 border-t border-[#F1E3D3] flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-bold font-mono text-[#3B2417]">
                    {card.metric}
                  </span>
                  <span className="block text-[11px] font-semibold text-[#8B5E3C]">
                    {card.metricLabel}
                  </span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#FAF1E6] flex items-center justify-center text-[#8B5E3C] group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors">
                  <Check className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
