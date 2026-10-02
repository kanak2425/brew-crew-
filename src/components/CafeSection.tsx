import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Calendar,
  Users,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  Heart,
} from 'lucide-react';
import { SmilingCoffeeCup, CuteCroissant, RetroStampBadge, CuteBeanSticker } from './Stickers';
import confetti from 'canvas-confetti';

export const CafeSection: React.FC = () => {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [partySize, setPartySize] = useState('2 people');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('3:00 PM');
  const [guestName, setGuestName] = useState('Alex Rivera');
  const [guestEmail, setGuestEmail] = useState('alex@example.com');

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationConfirmed(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#8B5E3C', '#F4D06F', '#E07A5F', '#C9A27E'],
    });
  };

  return (
    <section id="cafe" className="relative py-24 bg-[#FAF1E6] overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Story Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8D2BA] shadow-xs text-xs font-semibold text-[#8B5E3C]">
            <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-current" />
            <span>Our Brick & Mortar Sanctuary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#3B2417] tracking-tight">
            Our Café: Come Hang With The Crew
          </h2>

          <p className="text-base sm:text-lg text-[#6E4F39] leading-relaxed [text-wrap:balance]">
            Started in 2021 from a humble vintage coffee cart on weekends, BREW CREW was born out of a simple desire: to make specialty coffee feel friendly, vibrant, and approachable. Today, our sun-filled Arts District café features leafy botanicals, warm oak tables, vinyl records spinning on low volume, and baristas who genuinely want to know how your week is going.
          </p>
        </div>

        {/* Café Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 relative rounded-3xl overflow-hidden bg-white p-3 shadow-lg border border-[#E8D2BA] group"
          >
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
              <img
                src="/src/assets/images/cafe_interior_cozy_1790978102359.jpg"
                alt="Cozy sun-drenched Brew Crew café interior with oak counter and plants"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <h4 className="text-lg font-bold font-display">The Main Sunroom & Espresso Bar</h4>
                  <p className="text-xs text-white/80">442 Sunbeam Alley · Arts District</p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                  Open 7 Days a Week
                </span>
              </div>
            </div>

            {/* Sticker overlay */}
            <div className="absolute top-6 right-6 hidden sm:block">
              <RetroStampBadge text="FREE WI-FI & SUNSHINE" />
            </div>
          </motion.div>

          {/* Secondary Photo & Barista Corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-4 flex flex-col gap-6"
          >
            {/* Ceramic Latte Pour shot */}
            <div className="relative flex-1 rounded-3xl overflow-hidden bg-white p-3 shadow-lg border border-[#E8D2BA] group">
              <div className="relative h-48 sm:h-full rounded-2xl overflow-hidden">
                <img
                  src="/src/assets/images/latte_art_pour_1790978114144.jpg"
                  alt="Barista crafting velvety latte art"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
                  <span>Fresh Oat Milk Steaming</span>
                </div>
              </div>
            </div>

            {/* Cozy Community Callout */}
            <div className="p-5 rounded-3xl bg-white border border-[#E8D2BA] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#8B5E3C] block">
                  Dog Friendly Patio
                </span>
                <span className="text-sm font-bold text-[#3B2417] font-display">
                  Puppuccinos on the House! 🐾
                </span>
              </div>
              <CuteCroissant className="w-10 h-10" />
            </div>
          </motion.div>
        </div>

        {/* Café Practical Info + Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 border border-[#E8D2BA] shadow-sm">
          {/* Details list */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold font-display text-[#3B2417]">
              Visit Details & Hours
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F1E3D3] flex items-center justify-center text-[#8B5E3C] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#3B2417]">Address</h4>
                  <p className="text-sm text-[#6E4F39]">
                    442 Sunbeam Alley, Arts District, Los Angeles, CA 90013
                  </p>
                  <span className="text-xs text-[#8B5E3C] font-semibold mt-0.5 inline-block">
                    Corner of 4th & Sunbeam (Look for the mustard yellow awning!)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F1E3D3] flex items-center justify-center text-[#8B5E3C] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#3B2417]">Opening Hours</h4>
                  <p className="text-sm text-[#6E4F39]">
                    <strong>Monday – Friday:</strong> 6:30 AM – 6:00 PM
                  </p>
                  <p className="text-sm text-[#6E4F39]">
                    <strong>Saturday – Sunday:</strong> 7:30 AM – 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F1E3D3] flex items-center justify-center text-[#8B5E3C] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#3B2417]">Phone & Social</h4>
                  <p className="text-sm text-[#6E4F39]">(555) 273-9273</p>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#8B5E3C] hover:text-[#3B2417] flex items-center gap-1 mt-0.5"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@brewcrewcoffee</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="px-6 py-3.5 bg-[#8B5E3C] hover:bg-[#3B2417] text-white font-display text-base font-bold rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Come Hang With The Crew (Reserve)</span>
              </button>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-[#FAF1E6] hover:bg-[#F1E3D3] text-[#3B2417] font-semibold text-sm rounded-2xl border border-[#E8D2BA] transition-colors flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B5E3C]" />
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8D2BA] bg-[#E8D2BA]/30 aspect-[4/3] flex flex-col shadow-inner">
              {/* Stylized Map View */}
              <div className="relative w-full h-full bg-[#E5D7C5] overflow-hidden flex items-center justify-center">
                {/* Street grid patterns */}
                <div className="absolute inset-0 opacity-40">
                  <div className="w-full h-4 bg-white/70 absolute top-12" />
                  <div className="w-full h-8 bg-white/80 absolute top-36 -rotate-3" />
                  <div className="w-full h-5 bg-white/70 absolute bottom-16" />
                  <div className="h-full w-6 bg-white/80 absolute left-24" />
                  <div className="h-full w-10 bg-white/90 absolute right-32 rotate-6" />
                </div>

                {/* Park green zone */}
                <div className="absolute top-8 left-36 w-32 h-24 bg-[#B7C9AB]/60 rounded-xl" />

                {/* Pin Card Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="p-3 bg-white rounded-2xl shadow-xl border-2 border-[#8B5E3C] flex items-center gap-2.5"
                  >
                    <SmilingCoffeeCup className="w-8 h-8" />
                    <div>
                      <span className="font-display font-bold text-xs text-[#3B2417] block">
                        BREW CREW CAFÉ
                      </span>
                      <span className="text-[10px] text-[#8B5E3C] font-semibold">
                        442 Sunbeam Alley · Open Now
                      </span>
                    </div>
                  </motion.div>
                  <div className="w-3 h-3 bg-[#8B5E3C] rotate-45 -mt-1.5" />
                  <div className="w-6 h-2 bg-black/20 rounded-full blur-xs mt-1" />
                </div>

                {/* Bottom Directions overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-[#E8D2BA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#3B2417]">Live Bar Status:</span>
                    <span className="ml-1 text-emerald-700 font-semibold">● Fast seating (under 5 min)</span>
                  </div>
                  <span className="text-[11px] text-[#8B5E3C] font-mono">3 min walk from Metro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation / Visit Request Modal */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReserveModalOpen(false)}
              className="fixed inset-0 bg-[#3B2417]/50 backdrop-blur-sm z-50 transition-opacity"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#FFF8F0] rounded-3xl p-6 sm:p-8 shadow-2xl z-50 border-2 border-[#E8D2BA]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8D2BA]">
                <div className="flex items-center gap-2">
                  <SmilingCoffeeCup className="w-8 h-8" />
                  <h3 className="text-xl font-bold font-display text-[#3B2417]">
                    Come Hang With The Crew
                  </h3>
                </div>
                <button
                  onClick={() => setIsReserveModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F1E3D3] hover:bg-[#E8D2BA] text-[#3B2417] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reservationConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <RetroStampBadge text="TABLE SAVED" />
                  <h4 className="text-2xl font-bold font-display text-[#3B2417]">
                    See You Soon, {guestName.split(' ')[0]}!
                  </h4>
                  <p className="text-sm text-[#6E4F39] max-w-xs mx-auto">
                    We saved a cozy nook for <strong>{partySize}</strong> on <strong>{date}</strong> at <strong>{time}</strong>. We'll have water & fresh coffee waiting!
                  </p>
                  <button
                    onClick={() => {
                      setReservationConfirmed(false);
                      setIsReserveModalOpen(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#8B5E3C] text-white text-sm font-bold rounded-xl shadow hover:bg-[#3B2417]"
                  >
                    Can't Wait!
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="mt-5 space-y-4">
                  <p className="text-xs text-[#6E4F39]">
                    Reserve a booth or community table slot for working, catching up with friends, or meeting our coffee crew.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#3B2417] mb-1">
                        Party Size
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#C9A27E]/60 rounded-xl text-xs text-[#3B2417]"
                      >
                        <option>1 person (Solo study)</option>
                        <option>2 people</option>
                        <option>3 - 4 people</option>
                        <option>5+ people (Community table)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3B2417] mb-1">
                        Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#C9A27E]/60 rounded-xl text-xs text-[#3B2417]"
                      >
                        <option>8:30 AM</option>
                        <option>10:00 AM</option>
                        <option>12:30 PM</option>
                        <option>3:00 PM</option>
                        <option>5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C9A27E]/60 rounded-xl text-xs text-[#3B2417]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B2417] mb-1">
                      Email (for confirmation reminder)
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C9A27E]/60 rounded-xl text-xs text-[#3B2417]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8B5E3C] hover:bg-[#3B2417] text-white font-display text-sm font-bold rounded-2xl shadow-md transition-transform active:scale-98 cursor-pointer mt-2"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
